/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { ProductStatus, ProductType } from "@prisma/client";

/* eslint-disable prettier/prettier */
export class CreateProductDto {
  name: string;
  category: string;
  description?: string;
  type: ProductType;
  price: string;
  mediaUrl?: string;
  fileUrl?: string;
  status?: ProductStatus;
  clientId?: string;
  affiliable?: boolean;
  commission?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id?: string;
}