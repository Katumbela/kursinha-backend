/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto, UpdateWithdrawalDto } from './dto/withdrawal.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/withdrawals')
@UseGuards(AuthGuard)
export class WithdrawalsController {
    constructor(private readonly withdrawalsService: WithdrawalsService) { }

    @Post()
    create(@Body() createWithdrawalDto: CreateWithdrawalDto) {
        return this.withdrawalsService.create(createWithdrawalDto);
    }

    @Get()
    findAll() {
        return this.withdrawalsService.findAll();
    }

    @Get('client/:clientId')
    findByClient(@Param('clientId') clientId: string) {
        return this.withdrawalsService.findByClient(clientId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.withdrawalsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWithdrawalDto: UpdateWithdrawalDto) {
        return this.withdrawalsService.update(id, updateWithdrawalDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.withdrawalsService.remove(id);
    }
}
