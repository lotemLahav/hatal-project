import { ProductGenre } from "src/products/enums/genre";
import { ProductProduction } from "src/products/enums/production";

export class CreateOrdersItemDto {
    order: { id: number }; 
    product: { id: number }; 
    price: number;
}

export interface ProductForOrder {
  id: number;
  name: string;
  genre: ProductGenre;
  production: ProductProduction;
  description: string;
  image_name: string;
  image_url: string;
  price: number; 
  duration: string;
}
