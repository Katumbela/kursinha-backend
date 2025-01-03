/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            // log: ['query', 'info', 'warn', 'error'],
        });
    }

    async onModuleInit() {
        await this.$connect();
        // console.log('Prisma conectado ao banco de dados.');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Prisma desconectado do banco de dados.');
    }
}
