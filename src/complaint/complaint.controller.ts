/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Get, Query, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { ComplaintService } from "./complaint.service";
import { CreateComplaintDto, UpdateComplaintDto } from './dto/complaint.dto';
import { AuthGuard } from "src/auth/auth.guard";

@Controller('api/complaints')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createComplaintDto: CreateComplaintDto) {
        return this.complaintService.createCompany({
            ...createComplaintDto,
            Empresa: {
                connect: { id: createComplaintDto.empresaId },
            },
        });
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Query() query: any): Promise<any[]> {
        return this.complaintService.findAll(query);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findOne(@Param('id') id: string) {
        return this.complaintService.findOne({ id }, {
            include: {
                respostas: true,
                Empresa: true,
            }
        },);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id: string, @Body() updateComplaintDto: UpdateComplaintDto) {
        return this.complaintService.update({ id }, updateComplaintDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async remove(@Param('id') id: string) {
        return this.complaintService.delete({ id });
    }
}
