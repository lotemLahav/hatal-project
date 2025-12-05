export interface User {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface FullUser {
  id: number
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface UserAuth {
  username: string;
  password: string;
}

export type GoogleJwtPayload = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};

export interface ProductProps {
  id: number;
  name: string;
  genre: string;
  production: string;
  description: string;
  image_name: string;
  image_url: string;
  price: number;
  duration: string;
}

export enum Genre {
  "drama",
  "comedy",
  "tragedy",
  "romance",
  "jukebox",
}

export enum Production {
  "broadway",
  "off broadway",
  "west end",
  "starkid",
}

export enum OrderStatus {
  WAITING_FOR_APPROVAL = 'waiting for approval',
  IN_THE_MAKING = 'in the making',
  ON_THE_WAY = 'on the way',
  CLOSED = 'closed',
}

export interface Order {
  created_at: Date;
  price: number;
  service_price: number;
  username: string;
}

export interface FullOrder {
  id: number;
  userId: string;
  created_at: Date;
  status: OrderStatus;
  price: number;
  service_price: number;
}

export interface OrderItem {
  order: number;
  product: number;
  price: number;
}