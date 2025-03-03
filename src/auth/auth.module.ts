/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientService } from '../client/client.service';
import { PrismaService } from '../common/services/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { StudentModule } from '../client/client.module';
import { EmailService } from '../utils/email-sender.services';

@Module({
  imports: [
    JwtModule.register({
      secret: 'kursinha@2024.',
      signOptions: { expiresIn: '60m' },
    }),
    forwardRef(() => StudentModule),
  ],
  providers: [
    ClientService,
    JwtStrategy,
    PrismaService,
    JwtService,
    EmailService,
  ],
  exports: [ClientService],
})
export class AuthModule { }
