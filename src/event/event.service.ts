/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { UpdateEventDto } from './dto/event.dto';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class EventService extends BaseService<UpdateEventDto> {
    constructor(private prisma: PrismaService) {
        super(prisma, 'event');
    }

    async findAll() {
        return this.prisma.event.findMany();
    }


    async findBySlug(slug: string) {
        return this.prisma.event.findFirst({ where: { slug } });
    }

}
