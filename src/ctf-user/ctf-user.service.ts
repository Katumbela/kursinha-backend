/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { CTFUserEntity } from './entity/ctf-user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO, ChangePasswordDto } from './dto/ctf-user.dto';
import { EmailService } from 'src/utils/email-sender.services';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma.service';
import { env } from '../config/env';

@Injectable()
export class CtfUserService extends BaseService<CTFUserEntity> {
  constructor(
    private prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {
    super(prisma, 'ctfUser');
  }

  async authenticate(
    authDatas: AuthDTO,
  ): Promise<{ token: string; user: CTFUserEntity }> {
    const email = authDatas.email;

    const user = await this.findOne({ email: email });

    if (!user || user.password !== authDatas.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email: user.email, sub: user.id, role: user.type };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { token, user };
  }

  async requestPasswordReset(email: string) {
    console.log(email);

    const client = await this.findOne({ email });

    if (!client) {
      throw new NotFoundException('User não encontrado');
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

    const client = await this.findOne({ id });
    if (!client) {
      throw new UnauthorizedException('User não encontrado');
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      client.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.update({ id }, { password: hashedNewPassword });

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
