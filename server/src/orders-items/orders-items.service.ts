import { Injectable } from '@nestjs/common';
import { CreateOrdersItemDto, ProductForOrder } from './dto/create-orders-item.dto';
import { UpdateOrdersItemDto } from './dto/update-orders-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersItem } from './entities/orders-item.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

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

  async findByOrder(orderId: number) {
    const orderItems = await this.ordersItemRepository.find({
      where: { order: { id: orderId } },
      relations: ['product'],
    });

    // Map the result to return product info with item price
    const productsWithItemPrice: ProductForOrder[] = orderItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      genre: item.product.genre,
      production: item.product.production,
      description: item.product.description,
      image_name: item.product.image_name,
      image_url: item.product.image_url,
      price: item.price, 
      duration: item.product.duration,
    }));

    return productsWithItemPrice;
  }

  update(id: number, updateOrdersItemDto: UpdateOrdersItemDto) {
    return `This action updates a #${id} ordersItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersItem`;
  }
}
