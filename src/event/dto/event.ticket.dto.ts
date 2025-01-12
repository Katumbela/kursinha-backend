import { PartialType } from '@nestjs/mapped-types';

export class CreateEventTicketDto {
  name: string;
  email?: string;
  phone: string;
  method: string;
  quantity?: number;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class updateEventTicketDto extends PartialType(CreateEventTicketDto) {}
