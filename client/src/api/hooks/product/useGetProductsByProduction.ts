import { useState } from "react";
import { Production, ProductProps } from "../../../utils/types";
import api from "../..";
import Swal from "sweetalert2";

export const useGetProductsByProduction = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const fetchProductsByProduction = async (production: Production | string) => {
    try {
      const response = await api.products().getAllProductsByProduction(production as Production);
      setProducts(response.data);
      return response.data;
    } catch (error: unknown) {
      Swal.fire("Oops", "cannot show gallery", "error");
      throw error;
    }
  };

  return { products, fetchProductsByProduction };
};