/* eslint-disable prettier/prettier */
// src/client/client.module.ts
import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [ClientController],
    providers: [ClientService, PrismaService, JwtService],
})
export class ClientModule { }
