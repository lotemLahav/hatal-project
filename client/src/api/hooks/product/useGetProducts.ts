import { useEffect, useState } from "react";
import { ProductProps } from "../../../utils/types";
import api from "../..";
import Swal from "sweetalert2";

export const useGetProducts = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts((await api.products().getAllProducts()).data);
      } catch (error: unknown) {
        Swal.fire("Oops", "cannot show gallery", "error");
      }
    };

    fetchProducts();
  }, []);

  return products;
};