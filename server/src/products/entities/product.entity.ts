import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductGenre } from '../enums/genre';
import { ProductProduction } from '../enums/location';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false, type: 'numeric', precision: 10, scale: 2 })
  duration: number;

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

  @ManyToMany(() => Order, (order) => order.products, { cascade: true })
  orders: Order[];
}
