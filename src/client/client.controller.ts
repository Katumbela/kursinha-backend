/* eslint-disable prettier/prettier */

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ClientService } from './client.service';
import {
  AuthDTO,
  ChangePasswordDto,
  CreateClientDto,
  RequestPasswordResetDto,
  ResetPasswordDto,
  UpdateClientDto,
} from './dto/client.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Post('login')
  auth(@Body() authDatas: AuthDTO, @Res() res: Response) {
    return this.clientService.authenticate(authDatas, res);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne({id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update({id }, updateClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientService.delete({id });
  }

  @Post('/password-reset-request')
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return await this.clientService.requestPasswordReset(
      requestPasswordResetDto.email,
    );
  }

  @Post('/password-reset-confirm')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.clientService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
  }

  @Patch('/change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    console.log(changePasswordDto);
    console.log(id);
    return await this.clientService.changePassword(id, changePasswordDto);
  }

  @Get('/validate-reset-token/:token')
  async validateResetToken(@Param('token') token: string) {
    const isValid = await this.clientService.validateResetToken(token);
    if (isValid) {
      return { message: 'Token válido' };
    } else {
      throw new BadRequestException('Token inválido ou expirado');
    }
  }
}
