import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './admin.gaurd';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard) 
export class AdminController {
    constructor(private readonly orderService: OrdersService,
        private productService: ProductsService) { }
  
  @Get('/orders')
  getAllOrders() {
    return this.orderService.findAll();
  };

  @Get('/products')
  getAllProducts() {
    return this.productService.findAll();
  };

  @Patch('/products')
  async deleteProduct(@Body() product: Product) {
    return await this.productService.updateRemove(product);
  };
}