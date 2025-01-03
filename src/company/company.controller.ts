/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Put, Delete, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthDTO } from 'src/client/dto/client.dto';
import { CreateCompanyDto, UpdateCompanyDTO } from './dto/company.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/company')
export class CompanyController {
    constructor(private readonly empresaService: CompanyService) { }


    @Get()
    @UseGuards(AuthGuard) // Proteger a rota
    async getAll() {
        return this.empresaService.findAll({ include: { reclamacoes: true, respostas: true, ProfileView: true, Discount: true } });
    }

    // Endpoint para autenticação (login)
    @Post('login')
    async login(@Body() authDto: AuthDTO) {
        return this.empresaService.authenticate(authDto);
    }

    // Endpoint para criação de empresa
    @Post()
    async create(@Body() createEmpresaDto: CreateCompanyDto) {
        return this.empresaService.create(createEmpresaDto);
    }

    // Endpoint para atualizar dados de uma empresa
    @Put(':id')
    @UseGuards(AuthGuard) // Proteger a rota
    async update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateCompanyDTO) {
        return this.empresaService.update({ id }, updateEmpresaDto);
    }

    // Endpoint para deletar uma empresa
    @Delete(':id')
    @UseGuards(AuthGuard) // Proteger a rota
    async delete(@Param('id') id: string) {
        return this.empresaService.delete({ id });
    }

    // Endpoint para obter informações de uma empresa
    @Get(':id')
    @UseGuards(AuthGuard) // Proteger a rota
    async getById(@Param('id') id: string) {
        const empresa = await this.empresaService.findOne({ id }, { include: { reclamacoes: true, respostas: true, ProfileView: true, Discount: true } });
        if (!empresa) {
            throw new UnauthorizedException('Empresa não encontrada');
        }
        return empresa;
    }

    // Endpoint para obter informações de uma empresa
    @Get('slug/:slug')
    @UseGuards(AuthGuard) // Proteger a rota
    async getBySlug(@Param('slug') slug: string) {
        const empresa = await this.empresaService.findFirst({ slug }, { include: { reclamacoes: true, respostas: true, ProfileView: true, Discount: true } });
        if (!empresa) {
            throw new UnauthorizedException('Empresa não encontrada');
        }
        return empresa;
    }

    // Endpoint para solicitar redefinição de senha (enviar token por email)
    @Post('request-password-reset')
    async requestPasswordReset(@Body('email') email: string) {
        return this.empresaService.requestPasswordReset(email);
    }

    // Endpoint para redefinir a senha da empresa
    @Post('reset-password')
    async resetPassword(@Body() { token, newPassword }: { token: string; newPassword: string }) {
        return this.empresaService.resetPassword(token, newPassword);
    }

    // Endpoint para verificar token de redefinição de senha
    @Get('validate-reset-token')
    async validateResetToken(@Query('token') token: string) {
        return this.empresaService.validateResetToken(token);
    }
}
