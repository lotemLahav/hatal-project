import { Injectable } from '@nestjs/common';
import { CreateOrdersItemDto } from './dto/create-orders-item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersItem } from './entities/orders-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersItemsService {
  constructor(
    @InjectRepository(OrdersItem)
    private ordersItemRepository: Repository<OrdersItem>,
  ) { }

  create(createOrdersItemDto: CreateOrdersItemDto) {
    const orderItem = this.ordersItemRepository.create(createOrdersItemDto);
    return this.ordersItemRepository.save(orderItem);
  }

  findAll() {
    return `This action returns all ordersItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersItem`;
  }

  update(id: number, updateOrdersItemDto: UpdateOrdersItemDto) {
    return `This action updates a #${id} ordersItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersItem`;
  }
}
