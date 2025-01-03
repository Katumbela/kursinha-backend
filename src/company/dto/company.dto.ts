/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    nomeEmpresa: string;

    @IsEmail()
    emailEmpresa: string;

    @IsString()
    senha: string;

    @IsOptional()
    numeroBI?: string;

    @IsOptional()
    siteEmpresa?: string;

    @IsOptional()
    whatsapp?: string;

    @IsOptional()
    enderecoEmpresa?: string;

    @IsOptional()
    sobre?: string;

    @IsOptional()
    nomeResponsavel?: string;

    @IsOptional()
    conta?: string = 'empresa';

    @IsOptional()
    tipo?: string = 'empresa';

    @IsOptional()
    insta?: string;

    @IsOptional()
    youtube?: string;

    @IsOptional()
    fb?: string;

    @IsOptional()
    selo?: boolean = false;

    @IsOptional()
    logo?: string;

    @IsOptional()
    capa?: string;

    @IsOptional()
    quando?: string;

    @IsOptional()
    categoria?: string;

    @IsOptional()
    slug?: string;  // Será gerado automaticamente, mas pode ser opcional aqui
}


export class UpdateCompanyDTO extends PartialType(CreateCompanyDto) {
    @IsOptional()
    id: string;
}