/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { ClientModule } from 'src/client/client.module';

@Module({
    imports: [

        JwtModule.register({
            secret: 'reputacao3602024',
            signOptions: { expiresIn: '60m' },
        }),
        forwardRef(() => ClientModule)
    ],
    providers: [ClientService, JwtStrategy, PrismaService, JwtService],
    exports: [ClientService],
})
export class AuthModule { }
