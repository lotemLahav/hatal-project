import axios, { AxiosResponse } from "axios";
import { Genre, Production, ProductProps, User, UserAuth } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export default {
  users() {
    return {
      create: (user: Partial<User>): Promise<AxiosResponse<User>> =>
        axiosInstance.post(`users`, user),
      getUser: (auth: UserAuth): Promise<AxiosResponse<User>> =>
        axiosInstance.post(`users/login`, auth),
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
};
