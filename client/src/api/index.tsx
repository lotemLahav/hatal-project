import axios, { AxiosResponse } from "axios";
import { User } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
});

export default {
  users() {
    return {
      addUser: (user: User): Promise<AxiosResponse<User>> =>
        axiosInstance.post(`users`, user),
    };
  },
};
