import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './enums/status';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) { }

  create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findAllByUser(userId: number) {
    return this.orderRepository.find({
      where: {
        user: { id: userId }
      }
    });
  }

  updateStatus(id: number, status: OrderStatus) {
    return this.orderRepository.update(
      { id: +id },       
      { status: status }   
    );
  }
}
