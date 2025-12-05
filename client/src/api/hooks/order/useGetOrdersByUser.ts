import { useState } from "react";
import api from "../..";
import Swal from "sweetalert2";
import { FullOrder } from "../../../utils/types";

export const useGetOrdersByUser = () => {
  const [orders, setOrders] = useState<FullOrder[]>([]);

  const fetchOrdersByUser = async (username: string) => {
    try {
      const response = await api.orders().getAllOrdersByUser(username);
      setOrders(response.data);
      return response.data;
    } catch (error: unknown) {
      Swal.fire("Oops", "cannot show orders", "error");
      throw error;
    }
  };

  return { orders, fetchOrdersByUser };
};