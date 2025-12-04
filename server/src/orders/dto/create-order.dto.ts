import { OrderStatus } from "../enums/status";

export class CreateOrderDto {
    userId: number;
    created_at: Date;
    status: OrderStatus;
    price: number;
    service_price: number;
}
