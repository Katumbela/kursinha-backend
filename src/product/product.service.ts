/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Product, Affiliate, ProductStatus } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ChangeProductStatusDto,
  DigitalProductFileDto
} from './dto/create-product.dto';

@Injectable()
export class ProductService {

  constructor(private prisma: PrismaService) { }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const client = await this.prisma.client.findUnique({ where: { id: data.clientId } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client.role !== 'PRODUCER') {
      throw new ForbiddenException('Only producers can create products');
    }

    const { clientId, ...productData } = data;

    return this.prisma.product.create({
      data: {
        ...productData,
        client: { connect: { id: clientId } },
      },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async updateProduct(clientId: string, id: string, data: UpdateProductDto): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.clientId !== clientId) {
      throw new ForbiddenException('You can only update your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data,
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async changeProductStatus(clientId: string, id: string, data: ChangeProductStatusDto): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.clientId !== clientId) {
      throw new ForbiddenException('You can only update your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data: { status: data.status },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async updateDigitalProductFile(clientId: string, id: string, data: DigitalProductFileDto): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.clientId !== clientId) {
      throw new ForbiddenException('You can only update your own products');
    }

    if (product.type !== 'DIGITAL') {
      throw new ForbiddenException('This operation is only allowed for digital products');
    }

    return this.prisma.product.update({
      where: { id },
      data: { fileUrl: data.fileUrl },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async deleteProduct(clientId: string, id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.clientId !== clientId) {
      throw new ForbiddenException('You can only delete your own products');
    }

    return this.prisma.product.delete({
      where: { id },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async listProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async getProductsByClientId(clientId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { clientId: clientId },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async requestAffiliate(clientId: string, productId: string): Promise<Affiliate> {
    return this.prisma.affiliate.create({
      data: {
        client: { connect: { id: clientId } },
        product: { connect: { id: productId } },
        status: 'PENDING',
      },
      include: { client: true, product: true },
    });
  }

  async approveAffiliate(productId: string, affiliateId: string): Promise<Affiliate> {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new ForbiddenException('Product not found');
    }
    return this.prisma.affiliate.update({
      where: { id: affiliateId },
      data: { status: 'APPROVED' },
      include: { client: true, product: true },
    });
  }

  async rejectAffiliate(productId: string, affiliateId: string): Promise<Affiliate> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
    if (!product) {
      throw new ForbiddenException('Product not found');
    }
    return this.prisma.affiliate.update({
      where: { id: affiliateId },
      data: { status: 'REJECTED' },
      include: { client: true, product: true },
    });
  }

  async getProductsByType(type: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { type: type as any },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }

  async getActiveProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { status: ProductStatus.ACTIVE },
      include: { client: true, affiliates: true, coproducers: true, sales: true },
    });
  }
}
