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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ClientService } from './client.service';
import {
  AuthDTO,
  ChangePasswordDto,
  CreateClientDto,
  EnableTwoFactorAuthDto,
  RequestPasswordResetDto,
  ResetPasswordDto,
  TwoFactorAuthDto,
  UpdateClientDto,
  UpdateNotificationPreferencesDto,
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

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req: Request) {
    const re: any = req['user'];
    const userId = re.sub as string;
    return this.clientService.findOne({ id: userId });
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update({ id }, updateClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientService.delete({ id });
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
  @UseGuards(AuthGuard)
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
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

  // New endpoints for account management
  @Get('2fa/generate')
  @UseGuards(AuthGuard)
  async generateTwoFactorSecret(@Req() req: Request) {
    const re: any = req['user'];
    const userId = re.sub as string;
    return await this.clientService.generateTwoFactorSecret(userId);
  }

  @Post('2fa/enable')
  @UseGuards(AuthGuard)
  async enableTwoFactorAuth(@Req() req: Request, @Body() enableTwoFactorAuthDto: EnableTwoFactorAuthDto) {
    const re: any = req['user'];
    const userId = re.sub as string;
    return await this.clientService.enableTwoFactorAuth(userId, enableTwoFactorAuthDto);
  }

  @Post('2fa/disable')
  @UseGuards(AuthGuard)
  async disableTwoFactorAuth(@Req() req: Request, @Body() twoFactorAuthDto: TwoFactorAuthDto) {
    const re: any = req['user'];
    const userId = re.sub as string;
    return await this.clientService.disableTwoFactorAuth(userId, twoFactorAuthDto);
  }

  @Post('2fa/validate')
  @UseGuards(AuthGuard)
  async validateTwoFactorAuth(@Req() req: Request, @Body() twoFactorAuthDto: TwoFactorAuthDto) {
    const re: any = req['user'];
    const userId = re.sub as string;
    return await this.clientService.validateTwoFactorAuth(userId, twoFactorAuthDto);
  }

  @Get('notification-preferences')
  @UseGuards(AuthGuard)
  async getNotificationPreferences(@Req() req: Request) {
    const re: any = req['user'];
    const userId = re.sub as string;
    return await this.clientService.getNotificationPreferences(userId);
  }

  @Put('notification-preferences')
  @UseGuards(AuthGuard)
  async updateNotificationPreferences(
    @Req() req: Request,
    @Body() updateNotificationPreferencesDto: UpdateNotificationPreferencesDto
  ) {
    const re: any = req['user'];
    const userId = re.sub as string;
    return await this.clientService.updateNotificationPreferences(
      userId,
      updateNotificationPreferencesDto.preferences
    );
  }
}
