import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders_items' })
export class OrdersItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.ordersItems)
    @JoinColumn({ name: "order_id" })
    order: Order;

    @ManyToOne(() => Product, (product) => product.ordersItems)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @Column({ nullable: false })
    quantity: number;

    @Column({ nullable: false, type: 'float' })
    price: number;
}