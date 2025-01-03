/* eslint-disable prettier/prettier */
// src/common/services/base.service.ts 
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<T> {
    constructor(private readonly model: any) { }

    async create(data: T): Promise<T> {
        return this.model.create({ data });
    }

    async findAll(params?: any): Promise<T[]> {
        return this.model.findMany({
            where: params?.where,
            include: params?.include,
            orderBy: params?.orderBy,
            skip: params?.skip,
            take: params?.take
        });
    }

    async findOne(where: Partial<T>, params?: any): Promise<T | null> {
        return this.model.findUnique({
            where,
            include: params?.include,
        });
    }

    async update(where: Partial<T>, data: Partial<T>): Promise<T> {
        return this.model.update({
            where,
            data,
        });
    }

    async findFirst(where: Partial<T>, params?: any): Promise<T | null> {
        return this.model.findFirst({
            where,
            include: params?.include,
            orderBy: params?.orderBy,
            skip: params?.skip,
            take: params?.take
        });
    }

    async delete(where: Partial<T>): Promise<T> {
        return this.model.delete({
            where,
        });
    }
}
