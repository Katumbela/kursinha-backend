/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [],
    controllers: [DiscountController],
    providers: [DiscountService, PrismaService, JwtService],
})
export class DiscountModule { }
