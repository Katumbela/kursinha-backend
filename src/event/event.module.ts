/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { PrismaService } from '../common/services/prisma.service';
import { EventController } from './event.controller';

@Module({
    controllers: [EventController],
    providers: [EventService, PrismaService],
})
export class EventModule { }
