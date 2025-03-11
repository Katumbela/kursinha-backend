/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product as ProductModel } from '@prisma/client';
import { 
  CreateProductDto, 
  UpdateProductDto, 
  ChangeProductStatusDto,
  DigitalProductFileDto 
} from './dto/create-product.dto';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() productData: CreateProductDto): Promise<ProductModel> {
    return this.productService.createProduct(productData);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string, 
    @Body() productData: UpdateProductDto, 
    @Body('clientId') clientId: string
  ): Promise<ProductModel> {
    return this.productService.updateProduct(clientId, id, productData);
  }

  @Put(':id/status')
  async changeProductStatus(
    @Param('id') id: string,
    @Body() statusData: ChangeProductStatusDto,
    @Body('clientId') clientId: string
  ): Promise<ProductModel> {
    return this.productService.changeProductStatus(clientId, id, statusData);
  }

  @Put(':id/digital-file')
  async updateDigitalProductFile(
    @Param('id') id: string,
    @Body() fileData: DigitalProductFileDto,
    @Body('clientId') clientId: string
  ): Promise<ProductModel> {
    return this.productService.updateDigitalProductFile(clientId, id, fileData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Body('clientId') clientId: string): Promise<ProductModel> {
    return this.productService.deleteProduct(clientId, id);
  }

  @Get()
  async listProducts(
    @Query('type') type?: string,
    @Query('status') status?: string
  ): Promise<ProductModel[]> {
    if (type) {
      return this.productService.getProductsByType(type);
    }
    
    if (status === 'active') {
      return this.productService.getActiveProducts();
    }
    
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

