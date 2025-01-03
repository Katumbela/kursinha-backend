/* eslint-disable prettier/prettier */

export class DiscountEntity {
    id?: string;
    title?: string;
    description?: string;
    code: string;
    percentage: number;
    expirationDate: Date;
    companyId: string;
}