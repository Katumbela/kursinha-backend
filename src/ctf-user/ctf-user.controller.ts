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
} from '@nestjs/common';
import { CtfUserService } from './ctf-user.service';
import {
  AuthDTO,
  ChangePasswordDto,
  CreateCTFUser,
  RequestPasswordResetDto,
  ResetPasswordDto,
  UpdateCTFUserDto,
} from './dto/ctf-user.dto';

@Controller('api/ctf-user')
export class CtfUserController {
  constructor(private readonly ctfUserService: CtfUserService) {}

  @Post()
  create(@Body() createCTFUserDto: CreateCTFUser) {
    return this.ctfUserService.create(createCTFUserDto);
  }

  @Post('login')
  auth(@Body() authDatas: AuthDTO) {
    return this.ctfUserService.authenticate(authDatas);
  }

  @Get()
  findAll() {
    return this.ctfUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ctfUserService.findOne({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateCTFUserDto) {
    return this.ctfUserService.update({ id }, updateClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ctfUserService.delete({ id });
  }

  @Post('/password-reset-request')
  async requestPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return await this.ctfUserService.requestPasswordReset(
      requestPasswordResetDto.email,
    );
  }

  @Post('/password-reset-confirm')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.ctfUserService.resetPassword(
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
    return await this.ctfUserService.changePassword(id, changePasswordDto);
  }

  @Get('/validate-reset-token/:token')
  async validateResetToken(@Param('token') token: string) {
    const isValid = await this.ctfUserService.validateResetToken(token);
    if (isValid) {
      return { message: 'Token válido' };
    } else {
      throw new BadRequestException('Token inválido ou expirado');
    }
  }
}
