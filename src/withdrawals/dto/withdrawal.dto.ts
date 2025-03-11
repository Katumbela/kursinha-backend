/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { WithdrawalStatus } from '@prisma/client';

export class CreateWithdrawalDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    amount: number;

    @IsUUID()
    @IsNotEmpty()
    clientId: string;
}

export class UpdateWithdrawalDto extends PartialType(CreateWithdrawalDto) {
    @IsEnum(WithdrawalStatus)
    @IsOptional()
    status?: WithdrawalStatus;

    @IsOptional()
    @IsString()
    rejectionReason?: string;

    @IsOptional()
    processedAt?: Date;
}
