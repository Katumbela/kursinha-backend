/* eslint-disable prettier/prettier */ 

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { UpdateApplicationDto } from './dto/application.dto';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class ApplicationService extends BaseService<UpdateApplicationDto> {
    constructor(private readonly prisma: PrismaService) {
        super(prisma, 'application');
    }


}
