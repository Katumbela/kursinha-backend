/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './client/client.module';
import { PrismaService } from './common/services/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { env } from './config/env';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SalesModule } from './sales/sales.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { FinancialModule } from './financial/financial.module';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.MAIL_HOST,
        port: parseInt(env.MAIL_PORT) || 587,
        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"KURSINHA - NO REPLY" <${env.MAIL_FROM}>`,
      },
      template: {
        dir: path.join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    StudentModule,
    AuthModule,
    ProductModule,
    SalesModule,
    WithdrawalsModule,
    FinancialModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService],
  exports: [PrismaService],
})
export class AppModule { }
