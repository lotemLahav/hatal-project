import { useState } from "react";
import { Genre, ProductProps } from "../../../utils/types";
import api from "../..";
import Swal from "sweetalert2";

export const useGetProductsByGenre = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const fetchProductsByGenre = async (genre: Genre | string) => {
    try {
      const response = await api.products().getAllProductsByGenre(genre as Genre);
      setProducts(response.data);
      return response.data;
    } catch (error: unknown) {
      Swal.fire("Oops", "cannot show gallery", "error");
      throw error;
    }
  };

  return { products, fetchProductsByGenre };
};