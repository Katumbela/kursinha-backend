/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Param, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { AuthGuard } from '../auth/auth.guard';
import { RegisterBankAccountDto } from './dto/register-bank-account.dto';
import { TransferRequestDto } from './dto/financial.dto';

@Controller('api/financial')
@UseGuards(AuthGuard)
export class FinancialController {
    constructor(private readonly financialService: FinancialService) { }

    @Get('earnings/:userId')
    async getEarnings(@Param('userId') userId: string) {
        return this.financialService.getUserEarnings(userId);
    }

    @Get('balance/:userId')
    async getBalance(@Param('userId') userId: string) {
        return this.financialService.getAvailableBalance(userId);
    }

    @Get('withdrawals/:userId')
    async getWithdrawalHistory(@Param('userId') userId: string) {
        return this.financialService.getWithdrawalHistory(userId);
    }

    @Get('transfers/:userId')
    async getTransferHistory(@Param('userId') userId: string) {
        return this.financialService.getBankTransferHistory(userId);
    }

    @Post('bank-account')
    async registerBankAccount(@Body() registerBankAccountDto: RegisterBankAccountDto) {
        try {
            return await this.financialService.registerBankAccount(registerBankAccountDto);
        } catch (error) {
            throw new HttpException(
                'Failed to register bank account',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Get('bank-accounts/:userId')
    async getBankAccounts(@Param('userId') userId: string) {
        return this.financialService.getUserBankAccounts(userId);
    }

    @Post('request-transfer')
    async requestTransfer(@Body() transferRequestDto: TransferRequestDto) {
        try {
            return await this.financialService.requestBankTransfer(transferRequestDto);
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to process transfer request',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
