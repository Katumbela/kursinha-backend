/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateSaleDto, SaleReportFilterDto, UpdateSaleDto } from './dto/sale.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SalesService } from './sales.service';


@Controller('api/sales')
@UseGuards(AuthGuard)
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @Post()
    create(@Body() createSaleDto: CreateSaleDto) {
        return this.salesService.create(createSaleDto);
    }

    @Get()
    findAll() {
        return this.salesService.findAll();
    }

    @Get('report')
    getSalesReport(@Query() filters: SaleReportFilterDto) {
        return this.salesService.getSalesReport(filters);
    }

    @Get('summary/:clientId')
    getSalesSummary(
        @Param('clientId') clientId: string,
        @Query() filters: SaleReportFilterDto,
    ) {
        return this.salesService.getSalesSummary(clientId, filters);
    }

    @Get('performance/:clientId')
    getProductPerformance(
        @Param('clientId') clientId: string,
        @Query('timeframe') timeframe: string,
    ) {
        return this.salesService.getProductPerformance(clientId, timeframe);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
        return this.salesService.update(id, updateSaleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.salesService.remove(id);
    }
}
