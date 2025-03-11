/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsEnum, IsNotEmpty, IsBoolean, ValidateIf } from 'class-validator';
import { ProductStatus, ProductType } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProductType)
  @IsNotEmpty()
  type: ProductType;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  mediaUrl?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsBoolean()
  @IsOptional()
  affiliable?: boolean;

  @IsString()
  @IsOptional()
  commission?: string;
  
  // Digital product specific fields
  @ValidateIf(o => o.type === ProductType.DIGITAL)
  @IsString()
  @IsOptional()
  memberAreaAccess?: string;
  
  // Service specific fields
  @ValidateIf(o => o.type === ProductType.SERVICO)
  @IsString()
  @IsOptional()
  serviceDetails?: string;
  
  @ValidateIf(o => o.type === ProductType.SERVICO)
  @IsBoolean()
  @IsOptional()
  scheduling?: boolean;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProductType)
  @IsOptional()
  type?: ProductType;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  mediaUrl?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsBoolean()
  @IsOptional()
  affiliable?: boolean;

  @IsString()
  @IsOptional()
  commission?: string;
  
  @IsString()
  @IsOptional()
  memberAreaAccess?: string;
  
  @IsString()
  @IsOptional()
  serviceDetails?: string;
  
  @IsBoolean()
  @IsOptional()
  scheduling?: boolean;
}

export class ChangeProductStatusDto {
  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;
}

export class DigitalProductFileDto {
  @IsString()
  @IsNotEmpty()
  fileUrl: string;
  
  @IsString()
  @IsOptional()
  description?: string;
}