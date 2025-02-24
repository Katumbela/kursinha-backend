/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseController } from './course.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
    controllers: [CourseController],
    providers: [CourseService, PrismaService],
})
export class CourseModule { }

