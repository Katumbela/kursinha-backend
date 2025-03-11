/* eslint-disable prettier/prettier */
import { IsOptional, IsBoolean } from "class-validator";

export class NotificationPreferencesDto {
  @IsOptional()
  @IsBoolean()
  newSales?: boolean;

  @IsOptional()
  @IsBoolean()
  paymentStatus?: boolean;

  @IsOptional()
  @IsBoolean()
  withdrawals?: boolean;

  @IsOptional()
  @IsBoolean()
  memberships?: boolean;

  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;
}
