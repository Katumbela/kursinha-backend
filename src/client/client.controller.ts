/* eslint-disable prettier/prettier */
// src/client/client.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { AuthDTO, CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Controller('api/clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientService.create(createClientDto);
    }

    @Post('login')
    auth(@Body() authDatas: AuthDTO) {
        return this.clientService.authenticate(authDatas);
    }

    @Get()
    findAll() {
        return this.clientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientService.findOne({ id });
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.update({ id }, updateClientDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.clientService.delete({ id });
    }
}
