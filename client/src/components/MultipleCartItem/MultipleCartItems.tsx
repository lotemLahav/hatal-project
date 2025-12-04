import { FC } from "react";
import { ProductProps } from "../../utils/types";
import { CartItem } from "../CartItem";

interface ProductCardProps {
    productProps: ProductProps[] |null;
}

export const MultipleCartItems: FC<ProductCardProps> = ({ productProps }) => {

    return (<>
        <div className="content d-flex flex-column">
            {productProps?.map((product, i) => (
                <div key={i} className="img-box">
                    <CartItem cartItemProps={product} />
                </div>
            ))}
        </div>
    </>)
}