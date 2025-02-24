/* eslint-disable prettier/prettier */


import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateApplicationDto } from './dto/application.dto';

@ApiTags('Applications')
@Controller('api/applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) { }

    @Post()
    @ApiOperation({ summary: 'Criar uma nova inscrição' })
    @ApiResponse({ status: 201, description: 'Inscrição criada com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async create(@Body() createApplicationDto: CreateApplicationDto) {
        const data = {
            ...createApplicationDto,
            // birthDate: new Date(),
            date: new Date(),
        }
        return this.applicationService.create(data);
    }

    @Get()
    @ApiOperation({ summary: 'Obter todas as inscrições' })
    @ApiResponse({ status: 200, description: 'Lista de inscrições obtida com sucesso' })
    async findAll() {
        return this.applicationService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obter uma inscrição pelo ID' })
    @ApiResponse({ status: 200, description: 'Inscrição obtida com sucesso' })
    @ApiResponse({ status: 404, description: 'Inscrição não encontrada' })
    async findOne(@Param('id') id: string) {
        return this.applicationService.findOne({ id });
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar uma inscrição pelo ID' })
    @ApiResponse({ status: 200, description: 'Inscrição atualizada com sucesso' })
    @ApiResponse({ status: 404, description: 'Inscrição não encontrada' })
    async update(@Param('id') id: string, @Body() updateApplicationDto: CreateApplicationDto) {
        return this.applicationService.update({ id }, updateApplicationDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover uma inscrição pelo ID' })
    @ApiResponse({ status: 200, description: 'Inscrição removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Inscrição não encontrada' })
    async remove(@Param('id') id: string) {
        return this.applicationService.delete({ id });
    }
}
