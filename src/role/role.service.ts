/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateRoleDto) {
        return this.prisma.role.create({
            data: {
                pic: data.image,
                name: data.name,
                about: data.about,
                role: data.role,
                cv: data.cv,
                linkedin: data.linkedin,
                x: data.x,
                team: data.team,
                phrases: {
                    create: data.phrases || [],
                },
            },
        });
    }

    async findAll() {
        return this.prisma.role.findMany({ include: { phrases: true } });
    }

    async findOne(id: number) {
        const role = await this.prisma.role.findUnique({ where: { id }, include: { phrases: true } });
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    async update(id: number, data: UpdateRoleDto) {
        await this.findOne(id);
        return this.prisma.role.update({
            where: { id },
            data: {
                pic: data.image,
                name: data.name,
                about: data.about,
                role: data.role,
                cv: data.cv,
                linkedin: data.linkedin,
                x: data.x,
                team: data.team,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.role.delete({ where: { id } });
    }
}
