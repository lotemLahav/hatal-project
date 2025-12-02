import { useEffect, useState } from "react";
import { Production, ProductProps } from "../../../utils/types";
import api from "../..";
import Swal from "sweetalert2";

export const useGetProductsByProduction = (production: Production) => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProductsByProduction = async () => {
      try {
        setProducts((await api.products().getAllProductsByProduction(production)).data);
      } catch (error: unknown) {
        Swal.fire("Oops", "cannot show gallery", "error");
      }
    };

    fetchProductsByProduction();
  }, []);

  return products;
};