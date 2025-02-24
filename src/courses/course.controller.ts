/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { CourseService } from './courses.service';

@Controller('api/courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get()
    async findAll(@Query('id') id?: string, @Query('slug') slug?: string) {
        if (id) {
            return this.courseService.findById(Number(id));
        }

        if (slug) {
            return this.courseService.findBySlug(slug);
        }

        return this.courseService.findAll();
    }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.create(createCourseDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(Number(id), updateCourseDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.courseService.remove(Number(id));
    }
}
