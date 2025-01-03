/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsArray, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateComplaintDto {
    @IsString()
    cliente: string;

    @IsEmail()
    emailCliente: string;

    @IsString()
    status: string;

    @IsInt()
    classificacao: number;

    @IsString()
    historia: string;
  
    @IsString()
    titulo: string;

    @IsString()
    solicitarNovamente: string;

    @IsArray()
    @IsOptional()
    anexos?: string[];

    @IsOptional()
    @IsBoolean()
    mostrarNome?: boolean;

    @IsOptional()
    @IsString()
    photo?: string;

    @IsString()
    quando: string;

    @IsString()
    nomeEmpresa: string;

    @IsString()
    empresaId: string;
}


export class UpdateComplaintDto extends PartialType(CreateComplaintDto) { }