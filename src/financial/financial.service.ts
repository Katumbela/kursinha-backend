/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { RegisterBankAccountDto } from './dto/register-bank-account.dto';
import { FinancialTransaction } from './entity/financial.entity';
import { TransferRequestDto } from './dto/financial.dto';

@Injectable()
export class FinancialService {
    constructor(private prisma: PrismaService) { }

    async getUserEarnings(userId: string) {
        // Find the client first to make sure they exist
        const client = await this.prisma.client.findUnique({
            where: { id: userId }
        });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        // Get all completed sales where this client is the seller
        const sales = await this.prisma.sale.findMany({
            where: {
                sellerId: userId,
                status: 'PAID',
            },
        });

        // Calculate gross earnings (total sale amount)
        const grossEarnings = sales.reduce((total, sale) => total + sale.amount, 0);

        // Calculate net earnings (after fees and commissions)
        const netEarnings = sales.reduce((total, sale) => total + sale.netAmount, 0);

        return {
            grossEarnings,
            netEarnings,
            salesCount: sales.length,
        };
    }

    async getAvailableBalance(userId: string) {
        // Get net earnings
        const { netEarnings } = await this.getUserEarnings(userId);

        // Get processed withdrawals
        const withdrawals = await this.prisma.withdrawal.findMany({
            where: {
                clientId: userId,
                status: 'PROCESSED',
            },
        });

        const totalWithdrawn = withdrawals.reduce((total, withdrawal) => total + withdrawal.amount, 0);

        // Available balance = net earnings - total withdrawn
        return {
            availableBalance: netEarnings - totalWithdrawn,
            totalWithdrawn,
            pendingWithdrawals: await this.getPendingWithdrawalsAmount(userId),
        };
    }

    async getPendingWithdrawalsAmount(userId: string) {
        const pendingWithdrawals = await this.prisma.withdrawal.findMany({
            where: {
                clientId: userId,
                status: 'PENDING',
            },
        });

        return pendingWithdrawals.reduce((total, withdrawal) => total + withdrawal.amount, 0);
    }

    async getWithdrawalHistory(userId: string) {
        return this.prisma.withdrawal.findMany({
            where: {
                clientId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async getBankTransferHistory(userId: string) {
        // Since there's no direct BankTransfer model in the schema,
        // we can use Withdrawals as bank transfers
        return this.prisma.withdrawal.findMany({
            where: {
                clientId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async registerBankAccount(data: RegisterBankAccountDto) {
        // First check if client exists
        const client = await this.prisma.client.findUnique({
            where: { id: data.clientId }
        });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        // Since schema doesn't have a BankAccount model yet,
        // we'll store it as JSON in the bankAccount field
        const bankAccountData = {
            bankName: data.bankName,
            accountName: data.accountName,
            accountNumber: data.accountNumber,
            accountType: data.accountType,
            default: data.default,
            createdAt: new Date(),
        };

        // Update client with bank account info
        const updatedClient = await this.prisma.client.update({
            where: { id: data.clientId },
            data: {
                bankAccount: JSON.stringify(bankAccountData),
            },
        });

        return {
            success: true,
            message: 'Bank account registered successfully',
            bankAccount: JSON.parse(updatedClient.bankAccount || '{}'),
        };
    }

    async getUserBankAccounts(userId: string) {
        const client = await this.prisma.client.findUnique({
            where: { id: userId }
        });

        if (!client) {
            throw new NotFoundException('Client not found');
        }

        if (!client.bankAccount) {
            return [];
        }

        try {
            // Assuming bankAccount field might contain a JSON string with bank account info
            const bankAccountData = JSON.parse(client.bankAccount);
            return [bankAccountData]; // Return as array for consistency with API contract
        } catch (error) {
            return [{
                accountNumber: client.bankAccount,
                accountName: client.name,
                default: true
            }];
        }
    }

    async requestBankTransfer(data: TransferRequestDto) {
        // Check available balance
        const { availableBalance } = await this.getAvailableBalance(data.clientId);

        if (data.amount > availableBalance) {
            throw new BadRequestException('Insufficient balance for this transfer');
        }

        // Create withdrawal record (which serves as bank transfer)
        const withdrawal = await this.prisma.withdrawal.create({
            data: {
                amount: data.amount,
                status: 'PENDING',
                clientId: data.clientId,
                fees: data.amount * 0.025, // 2.5% fee example
            },
        });

        return {
            id: withdrawal.id,
            amount: withdrawal.amount,
            status: withdrawal.status,
            createdAt: withdrawal.createdAt,
            fees: withdrawal.fees,
            netAmount: withdrawal.amount - withdrawal.fees,
            message: 'Transfer request submitted successfully',
        };
    }

    // Utility method to record financial transactions
    // Note: This would require adding a FinancialTransaction model to the schema
    async createFinancialTransaction(data: FinancialTransaction) {
        // This is a stub - in a real implementation, you would save to a database
        console.log('Financial transaction recorded:', data);
        return {
            id: 'transaction-' + Date.now(),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
