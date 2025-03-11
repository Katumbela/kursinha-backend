/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionType, TransactionStatus } from '../entity/financial.entity';

export class CreateFinancialTransactionDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  type: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  status: TransactionStatus;

  @IsString()
  @IsOptional()
  reference?: string;
}

export class TransferRequestDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;
  
  @IsString()
  @IsNotEmpty()
  bankAccountId: string;
  
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  
  @IsString()
  @IsOptional()
  description?: string;
}
