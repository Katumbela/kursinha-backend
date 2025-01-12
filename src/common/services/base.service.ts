/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class BaseService<T> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly modelName: string,
  ) {}

  async create(data: T): Promise<T> {
    return this.prismaService[this.modelName].create({ data });
  }

  async findAll(params?: any): Promise<T[]> {
    return this.prismaService[this.modelName].findMany({
      where: params?.where,
      include: params?.include,
      orderBy: params?.orderBy,
      skip: params?.skip,
      take: params?.take,
    });
  }

  async findOne(where: Partial<T>, params?: any): Promise<T | null> {
    return this.prismaService[this.modelName].findUnique({
      where,
      include: params?.include,
    });
  }

  async update(where: Partial<T>, data: Partial<T>): Promise<T> {
    return this.prismaService[this.modelName].update({
      where,
      data,
    });
  }

  async findFirst(where: any, params?: any): Promise<T | null> {
    return this.prismaService[this.modelName].findFirst({
      where,
      include: params?.include,
      orderBy: params?.orderBy,
      skip: params?.skip,
      take: params?.take,
    });
  }

  async delete(where: Partial<T>): Promise<T> {
    return this.prismaService[this.modelName].delete({
      where,
    });
  }
}
