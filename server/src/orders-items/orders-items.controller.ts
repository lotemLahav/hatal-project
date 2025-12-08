import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersItemsService } from './orders-items.service';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@Controller('orders-items')
export class OrdersItemsController {
  constructor(private readonly ordersItemsService: OrdersItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrdersItemDto: CreateOrdersItemDto) {
    return this.ordersItemsService.create(createOrdersItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':orderId')
  findByOrder(@Param('orderId') orderId: number) {
    return this.ordersItemsService.findByOrder(+orderId);
  }
}
