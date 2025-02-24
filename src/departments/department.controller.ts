/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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
    async findAll() {
        return this.departmentService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.departmentService.findOne({ id: Number(id) }, { include: { departmentDirector: true, courses: true } });
    }

    @Get('slug/:slug')
    async findBySlug(@Param('slug') slug: string) {
        return this.departmentService.findFirst({ slug: slug }, { include: { departmentDirector: true, courses: true } });
    }

    @Get('course-id/:courseId')
    async findByCourseId(@Param('courseId') courseId: number) {
        return this.departmentService.findFirst({ courseId: Number(courseId) }, { include: { departmentDirector: true, courses: true } });
    }

    @Get(':id/courses')
    async findCoursesByDepartmentId(@Param('id') id: number) {
        return this.departmentService.findCoursesByDepartmentId(id);
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
