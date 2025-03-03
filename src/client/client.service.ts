/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { Client as ClientEntity } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO, ChangePasswordDto, CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { EmailService } from '../utils/email-sender.services';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../common/services/prisma.service';
import { Response } from 'express';
import { env } from '../config/env';

@Injectable()
export class ClientService extends BaseService<UpdateClientDto> {
  constructor(
    private prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {
    super(prisma, 'client');
  }

  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const hashedPassword = await bcrypt.hash(createClientDto.password, 10);
    const clientData = { ...createClientDto, password: hashedPassword };
    const newClient = await this.prisma.client.create({ data: clientData });

    // Send welcome email
    await this.emailService.sendWelcomeEmail(newClient.email, newClient.name);

    return newClient;
  }

  async authenticate(authDatas: AuthDTO, res: Response): Promise<any> {
    try {
      const email = authDatas.email;
      const user = await this.findOne({ email });

      if (!user || !(await bcrypt.compare(authDatas.password, user.password))) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const payload = { email: user.email, sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload, {
        secret: env.JWT_SECRET,
      });

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000, // 1 hora
      });

      const { password, ...userWithoutPassword } = user;

      // ✅ Garante que a resposta só será enviada uma vez
      if (!res.headersSent) {
        return res.status(200).json({ user: userWithoutPassword });
      }
    } catch (error) {
      console.error('Erro no login:', error);

      // ✅ Evita enviar duas respostas
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Erro interno no servidor' });
      }
    }
  }


  async requestPasswordReset(email: string) {

    const client = await this.findOne({ email });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const token = this.jwtService.sign(
      { email },
      { expiresIn: '30m', secret: env.JWT_SECRET },
    );
    try {
      await this.emailService.sendPasswordResetEmail(email, token);
      return {
        success: true,
        message: 'Token de recuperação enviado para o email',
      };
    } catch (error: any) {
      console.log(error.message);
      throw new InternalServerErrorException(
        'Erro ao enviar o email de recuperação',
      );
    }
  }

  async resetPassword(token: string, newPassword: string) {
    const payload = this.jwtService.verify(token);
    const client = await this.findOne({ email: payload.email });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.update({ email: payload.email }, { password: hashedPassword });

    return { message: 'Senha redefinida com sucesso' };
  }

  async changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword, token } = changePasswordDto;

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    const decoded = this.jwtService.verify(token);
    if (!decoded) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    const client = await this.findOne({ id: Number(id) });
    if (!client) {
      throw new UnauthorizedException('Cliente não encontrado');
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      client.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.update({ id: Number(id) }, { password: hashedNewPassword });

    return { message: 'Senha alterada com sucesso' };
  }

  async validateResetToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      return !!decoded;
    } catch (error: any) {
      console.log(error.message);
      throw new BadRequestException('Token inválido ou expirado');
    }
  }
}
