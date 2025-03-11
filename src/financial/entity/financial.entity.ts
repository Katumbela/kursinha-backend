/* eslint-disable prettier/prettier */
export enum TransactionType {
  SALE = 'SALE',
  WITHDRAWAL = 'WITHDRAWAL',
  COMMISSION = 'COMMISSION',
  REFUND = 'REFUND',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export class FinancialTransaction {
  id?: string;
  producerId: string;
  type: TransactionType;
  amount: number;
  description?: string;
  status: TransactionStatus;
  reference?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BankAccount {
  id?: string;
  producerId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branchCode?: string;
  accountType: string; // Savings, Current, etc.
  default: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BankTransfer {
  id?: string;
  producerId: string;
  bankAccountId: string;
  amount: number;
  status: TransactionStatus;
  reference?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
