/* eslint-disable prettier/prettier */
// src/client/client.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/utils/email-sender.services';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
    controllers: [CompanyController],
    providers: [CompanyService, PrismaService, JwtService, EmailService],
})
export class CompanyModule { }
