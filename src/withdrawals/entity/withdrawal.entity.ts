/* eslint-disable prettier/prettier */
import { UpdateClientDto } from "../../client/dto/client.dto";
import { WithdrawalStatus } from '@prisma/client';

export class WithdrawalEntity {
    id: string;
    amount: number;
    status: WithdrawalStatus;
    clientId: string;
    client?: UpdateClientDto;
    createdAt: Date;
    processedAt?: Date;
    rejectionReason?: string;
    fees: number;
}
