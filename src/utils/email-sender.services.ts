/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { env } from 'src/config/env';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${env.frontBaseUrl}/password-reset/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperação de Senha',
      template: 'reset-password',
      context: {
        resetUrl,
      },
    });
  }

  async sendAdminInviteEmail(email: string, adminName: string, adminEmail: string) {
    const inviteUrl = `${env.frontBaseUrl}/admin-dashboard`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Convite para ser Admin',
      template: 'admin-invite',
      context: {
        adminName,
        inviteUrl,
        adminEmail,
      },
    });
  }
}
