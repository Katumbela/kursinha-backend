/* eslint-disable prettier/prettier */
// src/discount/discount.service.ts
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { DiscountEntity } from './entity/discount.entity';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class DiscountService extends BaseService<DiscountEntity> {
    constructor(
        private prisma: PrismaService
    ) {
        super(prisma, 'discount');
    }

}