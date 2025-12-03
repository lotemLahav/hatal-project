import { FC } from "react";
import { ProductProps } from "../../utils/types";
import { CartItem } from "../CartItem";

interface ProductCardProps {
    productProps: ProductProps[];
}

export const ProductCard: FC<ProductCardProps> = ({ productProps }) => {

    return (<>
        <div className="content d-flex flex-column p-4 flex-grow-1">
            {productProps.map((product, i) => (
                <div key={i} className="img-box p-3">
                    <CartItem cartItemProps={product} />
                </div>
            ))}
        </div>
    </>)
}