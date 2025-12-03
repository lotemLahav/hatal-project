import { useContext } from "react";
import { CartContext } from "./CartContex";

export const useCart = () => {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error(
      "cart is empty"
    );
  }

  return cart;
};
