/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateWithdrawalDto, UpdateWithdrawalDto } from './dto/withdrawal.dto'; 
import { WithdrawalStatus } from '@prisma/client';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class WithdrawalsService {
    private readonly WITHDRAWAL_FEE = 2.5; // Percentage

    constructor(
        private readonly prisma: PrismaService,
        private readonly salesService: SalesService
    ) { }

    async create(createWithdrawalDto: CreateWithdrawalDto): Promise<any> {
        const { amount, clientId } = createWithdrawalDto;

        // Check if client exists
        const client = await this.prisma.client.findUnique({
            where: { id: clientId },
        });

        if (!client) {
            throw new NotFoundException(`Client with ID ${clientId} not found`);
        }

        // Check if the client has sufficient balance
        const summary = await this.salesService.getSalesSummary(clientId, {});

        if (amount > summary.availableBalance) {
            throw new BadRequestException(`Insufficient balance. Available: ${summary.availableBalance}, Requested: ${amount}`);
        }

        // Calculate fees
        const fees = (amount * this.WITHDRAWAL_FEE) / 100;

        const withdrawal = await this.prisma.withdrawal.create({
            data: {
                amount,
                clientId,
                fees,
            },
            include: { client: true },
        });

        return withdrawal;
    }

    async findAll(): Promise<any[]> {
        return this.prisma.withdrawal.findMany({
            include: { client: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByClient(clientId: string): Promise<any[]> {
        return this.prisma.withdrawal.findMany({
            where: { clientId },
            include: { client: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string): Promise<any> {
        const withdrawal = await this.prisma.withdrawal.findUnique({
            where: { id },
            include: { client: true },
        });

        if (!withdrawal) {
            throw new NotFoundException(`Withdrawal with ID ${id} not found`);
        }

        return withdrawal;
    }

    async update(id: string, updateWithdrawalDto: UpdateWithdrawalDto): Promise<any> {
        const withdrawal = await this.findOne(id);

        // If status is being updated to PROCESSED, set the processedAt date
        const data = { ...updateWithdrawalDto };
        if (data.status === WithdrawalStatus.PROCESSED && !data.processedAt) {
            data.processedAt = new Date();
        }

        return this.prisma.withdrawal.update({
            where: { id },
            data,
            include: { client: true },
        });
    }

    async remove(id: string): Promise<any> {
        await this.findOne(id);

        return this.prisma.withdrawal.delete({
            where: { id },
            include: { client: true },
        });
    }
}
