/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { ComplaintEntity } from './entity/complaint.entity';

@Injectable()
export class ComplaintService extends BaseService<ComplaintEntity> {
    constructor(private readonly prisma: PrismaService,) {
        super(prisma, 'reclamacao');
    }

    async createCompany(data: any): Promise<ComplaintEntity> {
        return this.prisma.reclamacao.create({ data });
    }
}
