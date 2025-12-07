import { useState } from "react";
import Swal from "sweetalert2";
import api from "../..";
import { CreateProductDto, ProductProps } from "../../../utils/types";

export const usePostProduct = () => {
  const [createdProduct, setCreatedProduct] = useState<ProductProps | null>(null);

  const postProduct = async (product: CreateProductDto) => {
    try {
      const res = await api.admin().postProduct(product);

      setCreatedProduct(res.data);
      return res.data;
    } catch (error) {
      Swal.fire("Oops!", "Could not create product. Try again.", "error");
      throw error;
    }
  };

  return { createdProduct, postProduct };
};
