/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';

@ApiTags('News')
@Controller('api/news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Post()
    @ApiOperation({ summary: 'Criar uma nova notícia' })
    create(@Body() data: CreateNewsDto) {
        return this.newsService.create(data);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as notícias' })
    findAll() {
        return this.newsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar notícia por ID' })
    async findById(@Param('id') id: number) {
        const news = await this.newsService.findOne({ id: Number(id) });
        if (!news) throw new NotFoundException('Notícia não encontrada!');
        return news;

    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Buscar notícia por Slug' })
    findBySlug(@Param('slug') slug: string) {
        return this.newsService.findBySlug(slug);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar uma notícia' })
    update(@Param('id') id: number, @Body() data: UpdateNewsDto) {
        return this.newsService.update({ id }, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar uma notícia' })
    delete(@Param('id') id: number) {
        return this.newsService.delete({ id });
    }
}
