import { FC, useState } from "react";
import { CartContext } from "./CartContex";
import { ProductProps } from "../../utils/types";

export const CartProvider: FC<{
    children: JSX.Element[] | JSX.Element;
}> = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<ProductProps[]>([]);

    const cartProductsCallback = (cart: ProductProps[]) => setCartProducts(cart); // directly update

    const resetCartProducts = () => setCartProducts([]);

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
