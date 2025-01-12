/* eslint-disable prettier/prettier */

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommunicationService } from './communication.service';

@WebSocketGateway()
export class CommunicationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly communicationService: CommunicationService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody('senderId') senderId: string,
    @MessageBody('receiverId') receiverId: string,
    @MessageBody('message') message: string,
    @MessageBody('chatId') chatId: string,
  ) {
    const newMessage = await this.communicationService.sendMessage(
      senderId,
      receiverId,
      message,
      chatId,
    );
    this.server.emit('receiveMessage', newMessage);
  }
}
