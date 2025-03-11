/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { SaleStatus } from '@prisma/client';

export class CreateSaleDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    amount: number;

    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsUUID()
    @IsNotEmpty()
    buyerId: string;

    @IsUUID()
    @IsNotEmpty()
    sellerId: string;

    @IsUUID()
    @IsOptional()
    affiliateId?: string;

    @IsString()
    @IsOptional()
    paymentMethod?: string;

    @IsString()
    @IsOptional()
    transactionId?: string;
}

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    @IsEnum(SaleStatus)
    @IsOptional()
    status?: SaleStatus;
}

export class SaleReportFilterDto {
    @IsOptional()
    @IsString()
    startDate?: string;

    @IsOptional()
    @IsString()
    endDate?: string;

    @IsOptional()
    @IsEnum(SaleStatus, { each: true })
    status?: SaleStatus[];

    @IsOptional()
    @IsString()
    productId?: string;

    @IsOptional()
    @IsString()
    buyerId?: string;

    @IsOptional()
    @IsString()
    sellerId?: string;

    @IsOptional()
    @IsString()
    affiliateId?: string;

    @IsOptional()
    @IsString()
    timeframe?: 'today' | 'yesterday' | '7days' | '30days' | '90days' | 'all' | 'custom';
}

export class SalesSummaryDto {
    overview: {
        totalSales: number;
        totalAmount: number;
        netAmount: number;
    };
    availableBalance: number;
    pendingBalance: number;
    refunds: number;
    chargebacks: number;
    balanceInDollars?: number;
}
