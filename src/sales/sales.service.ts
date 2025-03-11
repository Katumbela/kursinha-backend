/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateSaleDto, SaleReportFilterDto, SalesSummaryDto, UpdateSaleDto } from './dto/sale.dto';
import { SaleStatus } from '@prisma/client';
import { addDays, format, startOfDay, endOfDay, subDays } from 'date-fns';

@Injectable()
export class SalesService {
    private readonly SERVICE_FEE_PERCENTAGE = 7.99;

    constructor(private readonly prisma: PrismaService) { }

    async create(createSaleDto: CreateSaleDto): Promise<any> {
        const { amount, productId, buyerId, sellerId, affiliateId } = createSaleDto;

        // Fetch product to check if it exists and get commission info
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        // Calculate service fee
        const serviceFee = (amount * this.SERVICE_FEE_PERCENTAGE) / 100;

        let commission = 0;
        // Calculate commission if there's an affiliate
        if (affiliateId && product.affiliable) {
            const commissionPercentage = product.commission ? parseFloat(product.commission) : 10;
            commission = (amount * commissionPercentage) / 100;
        }

        // Calculate net amount (amount - serviceFee - commission)
        const netAmount = amount - serviceFee - commission;

        // Create sale record
        const sale = await this.prisma.sale.create({
            data: {
                ...createSaleDto,
                netAmount,
                commission,
                serviceFee,
            },
            include: {
                buyer: true,
                seller: true,
                affiliate: true,
                product: true,
            },
        });

        // If the client has notifications enabled, send a new sale notification
        if ((sale.seller.notificationPreferences as { newSales?: boolean })?.newSales) {
            // Create a notification for the seller
            await this.prisma.notification.create({
                data: {
                    clientId: sellerId,
                    message: `Nova venda realizada: ${product.name} por ${sale.amount}`,
                    type: 'SALE',
                }
            });
        }

        return sale;
    }

    async findAll(): Promise<any[]> {
        return this.prisma.sale.findMany({
            include: {
                buyer: true,
                seller: true,
                affiliate: true,
                product: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string): Promise<any> {
        const sale = await this.prisma.sale.findUnique({
            where: { id },
            include: {
                buyer: true,
                seller: true,
                affiliate: true,
                product: true,
            },
        });

        if (!sale) {
            throw new NotFoundException(`Sale with ID ${id} not found`);
        }

        return sale;
    }

    async update(id: string, updateSaleDto: UpdateSaleDto): Promise<any> {
        await this.findOne(id);

        return this.prisma.sale.update({
            where: { id },
            data: updateSaleDto,
            include: {
                buyer: true,
                seller: true,
                affiliate: true,
                product: true,
            },
        });
    }

    async remove(id: string): Promise<any> {
        await this.findOne(id);

        return this.prisma.sale.delete({
            where: { id },
            include: {
                buyer: true,
                seller: true,
                affiliate: true,
                product: true,
            },
        });
    }

    private getDateRangeFromTimeframe(timeframe: string): { startDate: Date; endDate: Date } {
        const now = new Date();
        const today = startOfDay(now);
        const endDate = endOfDay(now);
        let startDate: Date;

        switch (timeframe) {
            case 'today':
                startDate = today;
                break;
            case 'yesterday':
                startDate = startOfDay(subDays(now, 1));
                break;
            case '7days':
                startDate = startOfDay(subDays(now, 7));
                break;
            case '30days':
                startDate = startOfDay(subDays(now, 30));
                break;
            case '90days':
                startDate = startOfDay(subDays(now, 90));
                break;
            case 'all':
            default:
                startDate = new Date(0); // Beginning of time
                break;
        }

        return { startDate, endDate };
    }

    async getSalesReport(filters: SaleReportFilterDto): Promise<any[]> {
        let dateRange: { startDate: Date; endDate: Date };

        if (filters.timeframe && filters.timeframe !== 'custom') {
            dateRange = this.getDateRangeFromTimeframe(filters.timeframe);
        } else if (filters.startDate) {
            dateRange = {
                startDate: new Date(filters.startDate),
                endDate: filters.endDate ? new Date(filters.endDate) : new Date(),
            };
        } else {
            // Default to all time if no date filter provided
            dateRange = {
                startDate: new Date(0),
                endDate: new Date(),
            };
        }

        const where: any = {
            createdAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate,
            },
        };

        // Add other filters if provided
        if (filters.status && filters.status.length > 0) {
            where.status = { in: filters.status };
        }
        if (filters.productId) where.productId = filters.productId;
        if (filters.buyerId) where.buyerId = filters.buyerId;
        if (filters.sellerId) where.sellerId = filters.sellerId;
        if (filters.affiliateId) where.affiliateId = filters.affiliateId;

        return this.prisma.sale.findMany({
            where,
            include: {
                buyer: true,
                seller: true,
                affiliate: true,
                product: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getSalesSummary(clientId: string, filters: SaleReportFilterDto): Promise<SalesSummaryDto> {
        const sales = await this.getSalesReport({ ...filters, sellerId: clientId });

        const overview = {
            totalSales: sales.length,
            totalAmount: sales.reduce((sum, sale) => sum + sale.amount, 0),
            netAmount: sales.reduce((sum, sale) => sum + sale.netAmount, 0),
        };

        const availableBalance = sales
            .filter(sale => sale.status === SaleStatus.PAID)
            .reduce((sum, sale) => sum + sale.netAmount, 0);

        const pendingBalance = sales
            .filter(sale => sale.status === SaleStatus.PENDING)
            .reduce((sum, sale) => sum + sale.netAmount, 0);

        const refunds = sales
            .filter(sale => sale.status === SaleStatus.REFUNDED)
            .reduce((sum, sale) => sum + sale.amount, 0);

        const chargebacks = sales
            .filter(sale => sale.status === SaleStatus.CHARGEBACK)
            .reduce((sum, sale) => sum + sale.amount, 0);

        // Convert to dollars using a fixed exchange rate (should be replaced with an API call)
        const balanceInDollars = availableBalance / 5.5;

        return {
            overview,
            availableBalance,
            pendingBalance,
            refunds,
            chargebacks,
            balanceInDollars,
        };
    }

    async getProductPerformance(clientId: string, timeframe: string): Promise<any> {
        const dateRange = this.getDateRangeFromTimeframe(timeframe);

        const products = await this.prisma.product.findMany({
            where: { clientId },
            include: {
                sales: {
                    where: {
                        createdAt: {
                            gte: dateRange.startDate,
                            lte: dateRange.endDate,
                        },
                    },
                },
            },
        });

        return products.map(product => ({
            id: product.id,
            name: product.name,
            totalSales: product.sales.length,
            totalAmount: product.sales.reduce((sum, sale) => sum + sale.amount, 0),
            netAmount: product.sales.reduce((sum, sale) => sum + sale.netAmount, 0),
        }));
    }
}
