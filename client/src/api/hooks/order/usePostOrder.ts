import { useState } from "react";
import Swal from "sweetalert2";
import api from "../..";
import { FullOrder, Order } from "../../../utils/types";

export const usePostOrder = () => {
  const [createdOrder, setCreatedOrder] = useState<FullOrder | null>(null);

  const postOrder = async (order: Order) => {
    try {
      const res = await api.orders().create(order);

      setCreatedOrder(res.data);
      return res.data;
    } catch (error) {
      Swal.fire("Oops!", "Could not create Order. Try again.", "error");
      throw error;
    }
  };

  return { createdOrder, postOrder };
};
