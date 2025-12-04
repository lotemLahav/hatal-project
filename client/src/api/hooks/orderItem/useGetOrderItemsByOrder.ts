import { useState } from "react";
import api from "../..";
import Swal from "sweetalert2";
import { ProductProps } from "../../../utils/types";

export const useGetOrderItemsByOrder = () => {
  const [prooducts, setProducts] = useState<ProductProps[]>([]);

  const fetchOrderItemsByOrder = async (orderId: number) => {
    try {
      const response = await api.ordersItems().getAllOrderItemsByOrder(orderId);
      setProducts(response.data);
      return response.data;
    } catch (error: unknown) {
      Swal.fire("Oops", "cannot show order Items", "error");
      throw error;
    }
  };

  return { prooducts, fetchOrderItemsByOrder };
};