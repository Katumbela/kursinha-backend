/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../utils/email-sender.services';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService, JwtService, EmailService],
})
export class StudentModule { }
