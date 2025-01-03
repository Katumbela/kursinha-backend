/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { ComplaintController } from './complaint.controller';
import { JwtService } from '@nestjs/jwt';

@Module({ 
    controllers: [ComplaintController],
    providers: [ComplaintService, PrismaService, JwtService],
})
export class ComplaintModule { }
