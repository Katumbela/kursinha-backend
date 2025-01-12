import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { PrismaService } from '../common/services/prisma.service';
import { EventTicketEntity } from './entity/event.ticket.entity';

@Injectable()
export class EventService extends BaseService<EventTicketEntity> {
  constructor(private prisma: PrismaService) {
    super(prisma, 'eventTicket');
  }
}
