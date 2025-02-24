/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(id?: number, slug?: string) {
        if (id) {
            return this.findById(id);
        }

        if (slug) {
            return this.findBySlug(slug);
        }

        return this.prisma.course.findMany();
    }

    async findById(id: number) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                department: true,
                years: { include: { semesters: { include: { subjects: true } } } },
                shift: true,
            },
        });
        if (!course) throw new NotFoundException('Curso não encontrado!');
        return course;
    }

    async findBySlug(slug: string) {
        const course = await this.prisma.course.findFirst({
            where: { slug },
            include: {
                department: true,
                years: { include: { semesters: { include: { subjects: true } } } },
                shift: true,
            },
        });
        if (!course) throw new NotFoundException('Curso não encontrado!');
        return course;
    }

    async create(createCourseDto: CreateCourseDto) {
        const { departmentId, ...courseData } = createCourseDto;
        return this.prisma.course.create({
            data: {
                ...courseData,
                benefits: courseData.benefits, // Add empty array as default value
                department: { connect: { id: departmentId } },
                shift: {
                    create: {
                        afternoon: createCourseDto.shift.afternoon,
                        evening: createCourseDto.shift.evening,
                        morning: createCourseDto.shift.morning,
                    }
                },
                years: {
                    create: createCourseDto.years.map((year) => ({
                        year: year.year,
                        semesters: {
                            create: year.semesters.map((semester) => ({
                                semester: semester.semester,
                                subjects: {
                                    create: semester.subjects.map((subject) => ({
                                        name: subject.name,
                                        workload: subject.workload,
                                    })),
                                },
                            })),
                        },
                    })),
                },
            },
        });
    }

    async update(id: number, updateCourseDto: UpdateCourseDto) {
        return this.prisma.course.update({
            where: { id },
            data: updateCourseDto,
            include: {
                department: true,
                years: { include: { semesters: { include: { subjects: true } } } },
                shift: true,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.course.delete({ where: { id } });
    }
}
