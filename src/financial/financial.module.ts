/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FinancialController } from './financial.controller'; 
import { PrismaService } from '../common/services/prisma.service';
import { FinancialService } from './financial.service';

@Module({
  controllers: [FinancialController],
  providers: [FinancialService, PrismaService],
  exports: [FinancialService],
})
export class FinancialModule {}
