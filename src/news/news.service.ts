/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateNewsDto } from './dto/news.dto';
import { BaseService } from '../common/services/base.service';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class NewsService extends BaseService<UpdateNewsDto> {
    constructor(private readonly prisma: PrismaService) {
        super(prisma, 'news');
    }


    async findBySlug(slug: string) {
        const news = await this.prisma.news.findFirst({ where: { slug } });
        if (!news) throw new NotFoundException('Notícia não encontrada!');
        return news;
    }
}
