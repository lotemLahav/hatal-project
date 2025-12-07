import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './admin.gaurd';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';

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
}