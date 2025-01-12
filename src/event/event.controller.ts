import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventTicketDto } from './dto/event.ticket.dto';

@Controller('api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getAllEvents() {
    return this.eventService.findAll();
  }

  @Get('/:id')
  getEventById(@Param('id') id: string) {
    return this.eventService.findOne({ id });
  }

  @Post()
  createEvent(@Body() eventTicketData: CreateEventTicketDto) {
    return this.eventService.create(eventTicketData);
  }
}
