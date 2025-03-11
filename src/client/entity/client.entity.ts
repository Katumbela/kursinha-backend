/* eslint-disable prettier/prettier */

export class StudentEntity {
  id?: string;
  name: string;
  bi?: string;
  phone?: string;
  city?: string;
  email: string;
  password: string;
  verified?: boolean;
  type?: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
  notificationPreferences?: {
    newSales: boolean;
    paymentStatus: boolean;
    withdrawals: boolean;
    memberships: boolean;
    emailNotifications: boolean;
  };
}
