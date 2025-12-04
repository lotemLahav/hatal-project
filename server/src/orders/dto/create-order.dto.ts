import { User } from "src/users/entities/user.entity";
import { OrderStatus } from "../enums/status";

export class PartialCreateOrderDto {
    created_at: Date;
    status: OrderStatus;
    price: number;
    service_price: number;
    username: string;
}
export class CreateOrderDto {
    user: { id: number }; 
    created_at: Date;
    status: OrderStatus;
    price: number;
    service_price: number;
}
