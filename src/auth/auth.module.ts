/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { ClientModule } from 'src/client/client.module';
import { EmailService } from 'src/utils/email-sender.services';

@Module({
    imports: [

        JwtModule.register({
            secret: 'kursinha@2024',
            signOptions: { expiresIn: '60m' },
        }),
        forwardRef(() => ClientModule)
    ],
    providers: [ClientService, JwtStrategy, PrismaService, JwtService, EmailService],
    exports: [ClientService],
})
export class AuthModule { }
