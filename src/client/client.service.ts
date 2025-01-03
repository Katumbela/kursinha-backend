/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/services/base.service';
import { ClientEntity } from './entity/client.entity';
import { PrismaService } from 'src/common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/client.dto';

@Injectable()
export class ClientService extends BaseService<ClientEntity> {
    constructor(prisma: PrismaService, private jwtService: JwtService) {
        super(prisma.client);
    }

    async authenticate(authDatas: AuthDTO): Promise<{ token: string, client: ClientEntity }> {
        const email = authDatas.email;

        const client = await this.findOne({
            email: email,
        });

        if (!client || client.password !== authDatas.password) {
            throw new Error('Invalid credentials');
        }

        const payload = { email: client.email, sub: client.id, role: client.type };
        // console.log(payload);
        const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
        return { token, client };
    }
}
