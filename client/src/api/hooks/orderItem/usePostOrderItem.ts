import { useState } from "react";
import Swal from "sweetalert2";
import api from "../..";
import { OrderItem } from "../../../utils/types";

export const usePostOrderItem = () => {
  const [createdOrderItem, setCreatedOrderItem] = useState<OrderItem | null>(null);

  const postOrderItem = async (orderItem: OrderItem) => {
    try {
      const res = await api.ordersItems().create(orderItem);

      setCreatedOrderItem(res.data);
      return res.data;
    } catch (error) {
      Swal.fire("Oops!", "Could not create Order item. Try again.", "error");
      throw error;
    }
  };

  return { createdOrderItem, postOrderItem };
};
