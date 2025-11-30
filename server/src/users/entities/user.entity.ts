import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: number;

  @OneToMany(() => Order, (order) => order.user)
  order: Order;
}
