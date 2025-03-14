/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { Role } from '@prisma/client';
import { NotificationPreferencesDto } from './notifiction-preferences.dto';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  bankAccount?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class AuthDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RequestPasswordResetDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  newPassword: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  token?: string;

  @IsString()
  newPassword: string;
}


export class TwoFactorAuthDto {
  @IsString()
  code: string;
}
export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  notificationPreferences?: NotificationPreferencesDto;

  @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean;

  @IsOptional()
  @IsString()
  twoFactorSecret?: string;
}


export class EnableTwoFactorAuthDto {
  @IsString()
  secret: string;

  @IsString()
  code: string;
}



export class UpdateNotificationPreferencesDto {
  @IsNotEmpty()
  preferences: NotificationPreferencesDto;
}
