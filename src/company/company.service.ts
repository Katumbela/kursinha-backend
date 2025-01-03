/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';  // BaseService como serviço genérico
import { PrismaService } from 'src/common/services/prisma.service';  // PrismaService
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/utils/email-sender.services';
import * as bcrypt from 'bcrypt';
import { CompanyEntity } from './entity/company.entity';
import { AuthDTO } from 'src/client/dto/client.dto';

@Injectable()
export class CompanyService extends BaseService<CompanyEntity> {
    constructor(
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService,
    ) {
        super(prisma, 'empresa');
    }

    async authenticate(authDatas: AuthDTO): Promise<{ token: string, company: CompanyEntity }> {
        const { email, password } = authDatas;

        const empresa = await this.findOne({ emailEmpresa: email }, { include: { reclamacoes: true, respostas: true, ProfileView: true, Discount: true } });

        if (!empresa || empresa.senha !== password) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { email: empresa.emailEmpresa, sub: empresa.id, role: empresa.tipo };
        const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
        return { token, company: empresa };
    }

    async requestPasswordReset(email: string) {
        const empresa = await this.findOne({ emailEmpresa: email }, { include: { reclamacoes: true, respostas: true, ProfileView: true, Discount: true } });

        if (!empresa) {
            throw new NotFoundException('Empresa não encontrada');
        }

        const token = this.jwtService.sign({ email }, { expiresIn: '30m', secret: process.env.JWT_SECRET });
        try {
            await this.emailService.sendPasswordResetEmail(email, token);
            return { success: true, message: 'Token de recuperação enviado para o email' };
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException('Erro ao enviar o email de recuperação');
        }
    }

    async resetPassword(token: string, newPassword: string) {
        const payload = this.jwtService.verify(token);
        const empresa = await this.findOne({ emailEmpresa: payload.email }, { include: { reclamacoes: true, respostas: true, ProfileView: true, Discount: true } });

        if (!empresa) {
            throw new NotFoundException('Empresa não encontrada');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.update({ emailEmpresa: payload.email }, { senha: hashedPassword });

        return { message: 'Senha redefinida com sucesso' };
    }

    async validateResetToken(token: string): Promise<boolean> {
        try {
            const decoded = this.jwtService.verify(token);
            return !!decoded;
        } catch (error) {
            console.log(error.message);
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }

    // async generateUniqueSlug(baseSlug: string): Promise<string> {
    //     const slug = baseSlug.toLowerCase().replace(/\s+/g, '-');

    //     // Verifica se o slug já existe
    //     const existingEmpresa = await this.prisma.empresa.findUnique({
    //         where: { slug }
    //     });

    //     if (!existingEmpresa) {
    //         return slug;
    //     }

    //     // Se o slug já existir, adiciona um sufixo
    //     let suffix = 1;
    //     while (await this.prisma.empresa.findUnique({ where: { slug: `${slug}-${suffix}` } })) {
    //         suffix++;
    //     }

    //     return `${slug}-${suffix}`;
    // }

    // Função extra para verificar documentos e números de telefone
    async verifyDocumentAndPhone(document_url: string, phone_number: string, company_id: string, company_name: string) {
        return this.prisma.verificacao.create({
            data: {
                document_url,
                company_name,
                phone_number,
                company_id,
                verified_at: new Date(),
            },
        });
    }
}
