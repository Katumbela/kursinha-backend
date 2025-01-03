/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsDate, IsOptional } from 'class-validator';


// DTO para criar um desconto (Create)
export class CreateDiscountDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsNumber()
    percentage: number;

    @IsDate()
    expirationDate: Date;

    @IsString()
    @IsNotEmpty()
    companyId: string;
}

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) { }