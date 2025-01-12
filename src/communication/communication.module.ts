import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CommunicationService, PrismaService],
  controllers: [CommunicationController],
  exports: [CommunicationService],
})
export class CommunicationModule {}
