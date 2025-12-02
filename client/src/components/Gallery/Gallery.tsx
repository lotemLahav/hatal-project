import { FC } from "react";
import { ProductProps } from "../../utils/types";
import { ProductCard } from "../productCard/ProductCard";

interface CardProps {
    productProps: ProductProps[];
}

export const Gallery: FC<CardProps> = ({ productProps }) => {

    return (
        <>
            <div className="content">
                {productProps.map((product, i) => (
                    <div key={i} className="img-box">
                        <ProductCard productProps={product} />
                    </div>
                ))}
            </div>
        </>
    );
}