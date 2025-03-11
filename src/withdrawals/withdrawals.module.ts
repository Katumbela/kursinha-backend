/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';
import { PrismaService } from '../common/services/prisma.service';
import { SalesModule } from '../sales/sales.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [SalesModule],
    controllers: [WithdrawalsController],
    providers: [WithdrawalsService, PrismaService, JwtService],
})
export class WithdrawalsModule { }
