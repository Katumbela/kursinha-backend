/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Get, Query, Param, Put, Delete } from "@nestjs/common";
import { ComplaintService } from "./complaint.service";
import { CreateComplaintDto, UpdateComplaintDto } from './dto/complaint.dto';

@Controller('api/complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) { }

    @Post()
    async create(@Body() createComplaintDto: CreateComplaintDto) {
        return this.complaintService.createCompany({
            ...createComplaintDto,
            Empresa: {
                connect: { id: createComplaintDto.empresaId },
            },
        });
    }

    @Get()
    async findAll(@Query() query: any): Promise<any[]> {
        return this.complaintService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.complaintService.findOne({ id }, {
            include: {
                respostas: true,
                Empresa: true,
            }
        },);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateComplaintDto: UpdateComplaintDto) {
        return this.complaintService.update({ id }, updateComplaintDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.complaintService.delete({ id });
    }
}
