/* eslint-disable prettier/prettier */
// src/discount/discount.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto, UpdateDiscountDto } from './dto/discount.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/discounts')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) { }

    @Post()
    async create(@Body() createDiscountDto: CreateDiscountDto) {
        return this.discountService.create(createDiscountDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll() {
        return this.discountService.findAll({
            orderBy: { id: 'desc' }, include: {
                Empresa: true
            }
        }
        );
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findOne(@Param('id') id: string) {
        return this.discountService.findOne({ id }, {
            include: {
                Empresa: true
            }
        });
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async update(
        @Param('id') id: string,
        @Body() updateDiscountDto: UpdateDiscountDto,
    ) {
        return this.discountService.update({ id }, updateDiscountDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async remove(@Param('id') id: string) {
        return this.discountService.delete({ id });
    }
}