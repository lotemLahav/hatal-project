import { useEffect, useState } from "react";
import { Genre, ProductProps } from "../../../utils/types";
import api from "../..";
import Swal from "sweetalert2";

export const useGetProductsByGenre = (genre: Genre) => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProductsByGenre = async () => {
      try {
        setProducts((await api.products().getAllProductsByGenre(genre)).data);
      } catch (error: unknown) {
        Swal.fire("Oops", "cannot show gallery", "error");
      }
    };

    fetchProductsByGenre();
  }, []);

  return products;
};