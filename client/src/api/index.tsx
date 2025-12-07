import axios, { AxiosResponse } from "axios";
import { FullOrder, FullUser, Genre, Order, OrderItem, Production, ProductProps, User, UserAuth } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  users() {
    return {
      create: (user: Partial<User>): Promise<AxiosResponse<User>> =>
        axiosInstance.post(`users`, user),
      getUser: (auth: UserAuth): Promise<AxiosResponse<User>> =>
        axiosInstance.post(`users/login`, auth),
      getUserByUsername: (username: string): Promise<AxiosResponse<FullUser>> =>
        axiosInstance.get(`users/${username}`),
    };
  },
  products() {
    return {
      getAllProducts: (): Promise<AxiosResponse<ProductProps[]>> =>
        axiosInstance.get(`products`),
      getAllProductsByGenre: (genre: Genre): Promise<AxiosResponse<ProductProps[]>> =>
        axiosInstance.get(`products/genre/${genre}`),
      getAllProductsByProduction: (production: Production): Promise<AxiosResponse<ProductProps[]>> =>
        axiosInstance.get(`products/production/${production}`),
    };
  },
  ordersItems() {
    return {
      create: (orderItem: OrderItem): Promise<AxiosResponse<OrderItem>> =>
        axiosInstance.post(`orders-items`, orderItem),
      getAllOrderItemsByOrder: (orderId: number): Promise<AxiosResponse<ProductProps[]>> =>
        axiosInstance.get(`orders-items/${orderId}`),
    };
  },
  orders() {
    return {
      create: (order: Order): Promise<AxiosResponse<FullOrder>> =>
        axiosInstance.post(`orders`, order),
      getAllOrdersByUser: (username: string): Promise<AxiosResponse<FullOrder[]>> =>
        axiosInstance.get(`orders/${username}`),
    };
  },
  admin() {
    return {
      getAllProducts: (): Promise<AxiosResponse<ProductProps[]>> =>
        axiosInstance.get(`admin/products`),
      getAllOrders: (): Promise<AxiosResponse<FullOrder[]>> =>
        axiosInstance.get(`admin/orders`),
      upadateDeleteProduct: (product: ProductProps): Promise<AxiosResponse<ProductProps | undefined>> =>
        axiosInstance.patch(`admin/products`, product),
      updateOrderStatus: (id: number, status: string): Promise<AxiosResponse<FullOrder|undefined>> =>
        axiosInstance.patch(`admin/orders/${id}`, {status}),
    };
  },
};
