/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { PrismaService } from '../common/services/prisma.service';

@Module({
    controllers: [ApplicationController],
    providers: [ApplicationService, PrismaService],
})
export class ApplicationModule { }
