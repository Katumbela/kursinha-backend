/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Query, Param } from '@nestjs/common';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
import { DepartmentService } from './department.service';


@Controller('api/departments')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) { }

    @Post()
    async create(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentService.createDepartment(createDepartmentDto);
    }

    @Get()
    async findAll(@Query('id') id?: number, @Query('slug') slug?: string, @Query('courseId') courseId?: number) {
        if (id) return this.departmentService.findOne({ id }, { include: { departmentDirector: true, courses: true }, });
        if (slug) return this.departmentService.findFirst({ slug: slug }, { include: { departmentDirector: true, courses: true }, });
        if (courseId) return this.departmentService.findFirst({ courseId: courseId }, { include: { departmentDirector: true, courses: true }, });
        return this.departmentService.findAll();
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentService.updateDep(id, updateDepartmentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.departmentService.delete({ id });
    }
}
