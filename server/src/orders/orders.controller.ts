import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, PartialCreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersService } from 'src/users/users.service';
import { OrderStatus } from './enums/status';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrderDto: PartialCreateOrderDto) {
    const user = await this.usersService.findOneByUsername(createOrderDto.username);
    if (user) {
      const { username, ...orderData } = createOrderDto;  // ✅ Destructure to remove username
      const order = {
        ...orderData,
        status: OrderStatus.WAITING_FOR_APPROVAL,
        user: { id: user.id }  // ✅ Pass user object with id
      };
      return await this.ordersService.create(order);
    } else {
      throw new NotFoundException("user not found");
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findAllByUser(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      return await this.ordersService.findAllByUser(user.id);
    } else {
      throw new NotFoundException("user not found")
    }
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
