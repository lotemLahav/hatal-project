import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersItem } from './entities/orders-item.entity';
import { OrdersItemsController } from './orders-items.controller';
import { OrdersItemsService } from './orders-items.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersItem]),
    UsersModule, // <-- required
  ],
  controllers: [OrdersItemsController],
  providers: [OrdersItemsService],
  exports: [OrdersItemsService],
})
export class OrdersItemsModule {}
