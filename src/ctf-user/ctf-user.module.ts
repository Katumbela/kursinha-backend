/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CtfUserService } from './ctf-user.service';
import { CtfUserController } from './ctf-user.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/utils/email-sender.services';

@Module({
  controllers: [CtfUserController],
  providers: [CtfUserService, PrismaService, JwtService, EmailService],
})
export class CtfUserModule {}
