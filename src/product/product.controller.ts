/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product as ProductModel } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async createProduct(@Body() productData: CreateProductDto): Promise<ProductModel> {
    return this.productService.createProduct(productData);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productData: UpdateProductDto, @Body('clientId') clientId: string): Promise<ProductModel> {
    return this.productService.updateProduct(clientId, id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Body('clientId') clientId: string): Promise<ProductModel> {
    return this.productService.deleteProduct(clientId, id);
  }

  @Get()
  async listProducts(): Promise<ProductModel[]> {
    return this.productService.listProducts();
  }

  @Post(':id/affiliate')
  async requestAffiliate(@Param('id') productId: string, @Body('clientId') clientId: string): Promise<any> {
    return this.productService.requestAffiliate(clientId, productId);
  }

  @Put(':id/affiliate/:affiliateId/approve')
  async approveAffiliate(@Param('id') productId: string, @Param('affiliateId') affiliateId: string): Promise<any> {
    return this.productService.approveAffiliate(productId, affiliateId);
  }

  @Put(':id/affiliate/:affiliateId/reject')
  async rejectAffiliate(@Param('id') productId: string, @Param('affiliateId') affiliateId: string): Promise<any> {
    return this.productService.rejectAffiliate(productId, affiliateId);
  }

  @Get('client/:clientId')
  async getProductsByClientId(@Param('clientId') clientId: string): Promise<ProductModel[]> {
    return this.productService.getProductsByClientId(clientId);
  }
}

