import { FC, useState } from "react";
import { CartContext } from "./CartContex";
import { ProductProps } from "../../utils/types";

export const CartProvider: FC<{
  children: JSX.Element[] | JSX.Element;
}> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<ProductProps[] | null>(
    null
  );

  const cartProductsCallback = (cart: ProductProps[]) => () =>
    setCartProducts(cart);

  const resetCartProducts = () => setCartProducts(null);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        cartProductsCallback,
        resetCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
