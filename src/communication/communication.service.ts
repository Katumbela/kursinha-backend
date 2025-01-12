/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class CommunicationService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(
    senderId: string,
    receiverId: string,
    message: string,
    chatId: string,
  ) {
    return this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        message,
        conversation: {
          connect: { id: chatId },
        },
      },
    });
  }

  async getMessages(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
