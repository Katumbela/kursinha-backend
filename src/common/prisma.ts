/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prismaS = new PrismaClient(
    {
        // log: ['query', 'info', 'warn', 'error'],
    }
);


export default prismaS;