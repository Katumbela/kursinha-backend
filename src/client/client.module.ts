/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/utils/email-sender.services';

@Module({
    controllers: [ClientController],
    providers: [ClientService, PrismaService, JwtService, EmailService],
})
export class ClientModule { }
