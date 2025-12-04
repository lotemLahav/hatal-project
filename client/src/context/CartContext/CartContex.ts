import { createContext } from "react";
import { ProductProps } from "../../utils/types";

export interface CartContextType {
  cartProducts: ProductProps[] | null;
  cartProductsCallback: (cartProducts: ProductProps[]) => void;
  resetCartProducts: () => void;
}

export const   CartContext =
  createContext<CartContextType | null>(null);
