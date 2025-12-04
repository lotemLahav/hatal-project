import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductGenre } from '../enums/genre';
import { ProductProduction } from '../enums/production';
import { OrdersItem } from 'src/orders-items/entities/orders-item.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false, type: 'time' })
  duration: string;

  @Column({
    type: 'enum',
    enum: ProductGenre,
  })
  genre: ProductGenre;

  @Column({
    type: 'enum',
    enum: ProductProduction,
  })
  production: ProductProduction;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  image_name: string;

  @Column({ type: 'text' })
  image_url: string;

  @OneToMany(() => OrdersItem, (ordersItems) => ordersItems.product)
  ordersItems: OrdersItem[];
}
