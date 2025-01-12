/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { StudentService } from 'src/client/student.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { StudentModule } from 'src/client/student.module';
import { EmailService } from 'src/utils/email-sender.services';

@Module({
  imports: [
    JwtModule.register({
      secret: 'hakyoff@2024.',
      signOptions: { expiresIn: '60m' },
    }),
    forwardRef(() => StudentModule),
  ],
  providers: [
    StudentService,
    JwtStrategy,
    PrismaService,
    JwtService,
    EmailService,
  ],
  exports: [StudentService],
})
export class AuthModule {}
