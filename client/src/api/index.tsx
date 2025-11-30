import axios, { AxiosResponse } from "axios";
import { User, UserAuth } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export default {
  users() {
    return {
      create: (user: User): Promise<AxiosResponse<User>> =>
        axiosInstance.post(`users`, user),
      getUser: (auth: UserAuth): Promise<AxiosResponse<User>> =>
        axiosInstance.get(`users`, {params: auth}),
    };
  },
};
