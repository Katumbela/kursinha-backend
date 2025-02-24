/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Controller('api/events')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Get()
    findAll(@Query('slug') slug?: string) {
        if (slug) {
            return this.eventService.findBySlug(slug);
        }
        return this.eventService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const event = await this.eventService.findOne({ id: Number(id) });;
        if (!event) {
            throw new NotFoundException('Evento não encontrado!');
        }
        return event;
    }

    @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventService.create(createEventDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventService.update({ id: Number(id) }, updateEventDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.eventService.delete({ id: Number(id) });
    }
}
