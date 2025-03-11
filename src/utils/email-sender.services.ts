/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { env } from '../config/env';

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

  async sendAdminInviteEmail(
    email: string,
    adminName: string,
    adminEmail: string,
  ) {
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

  async sendWelcomeEmail(email: string, userName: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Bem-vindo ao Kursinha Backend',
      template: 'welcome-email',
      context: {
        userName,
      },
    });
  }

  // General method for sending email notifications
  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
    template?: string,
    context?: any
  ) {
    try {
      const mailOptions = {
        to,
        subject,
        text,
        ...(html && { html }),
        ...(template && { template }),
        ...(context && { context }),
      };

      return await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendNotificationEmail(
    email: string,
    userName: string,
    notificationType: string,
    notificationDetails: any
  ) {
    let subject = 'Notificação Kursinha';
    let message = '';

    switch (notificationType) {
      case 'newSales':
        subject = 'Nova Venda Registrada';
        message = `Uma nova venda foi registrada em sua conta no valor de ${notificationDetails.value}.`;
        break;
      case 'paymentStatus':
        subject = 'Atualização de Status de Pagamento';
        message = `O status do seu pagamento foi atualizado para: ${notificationDetails.status}.`;
        break;
      case 'withdrawals':
        subject = 'Saque Processado';
        message = `Um saque foi ${notificationDetails.status} na sua conta no valor de ${notificationDetails.value}.`;
        break;
      case 'memberships':
        subject = 'Atualização de Assinatura';
        message = `Sua assinatura foi ${notificationDetails.status}. Tipo: ${notificationDetails.type}.`;
        break;
      default:
        message = 'Você recebeu uma nova notificação em sua conta.';
    }

    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: 'notification',
      context: {
        userName,
        message,
        notificationType,
        details: notificationDetails,
        actionUrl: `${env.frontBaseUrl}/dashboard`,
        currentYear: new Date().getFullYear()
      },
    });
  }
}
