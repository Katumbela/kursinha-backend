/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { PrismaService } from '../common/services/prisma.service';
import { DepartmentController } from './department.controller';

@Module({
    providers: [DepartmentService, PrismaService],
    controllers: [DepartmentController],
})
export class DepartmentModule { }
