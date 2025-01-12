/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CommunicationService } from './communication.service';

@ApiTags('communication')
@Controller('communication')
export class CommunicationController {
    constructor(private readonly communicationService: CommunicationService) { }

    @Post('send')
    @ApiOperation({ summary: 'Send a message' })
    @ApiBody({ schema: { properties: { senderId: { type: 'string' }, receiverId: { type: 'string' }, message: { type: 'string' }, chatId: { type: 'string' } } } })
    @ApiResponse({ status: 201, description: 'Message sent successfully.' })
    async sendMessage(
        @Body('senderId') senderId: string,
        @Body('receiverId') receiverId: string,
        @Body('message') message: string,
        @Body('chatId') chatId: string,
    ) {
        return this.communicationService.sendMessage(senderId, receiverId, message, chatId);
    }

    @Get('messages/:conversationId')
    @ApiOperation({ summary: 'Get messages by conversation ID' })
    @ApiParam({ name: 'conversationId', required: true, description: 'ID of the conversation' })
    @ApiResponse({ status: 200, description: 'Messages retrieved successfully.' })
    async getMessages(@Param('conversationId') conversationId: string) {
        return this.communicationService.getMessages(conversationId);
    }
}
