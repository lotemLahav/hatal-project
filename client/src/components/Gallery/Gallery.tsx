import { FC } from "react";
import { ProductProps } from "../../utils/types";
import { ProductCard } from "../productCard/ProductCard";

interface CardProps {
    productProps: ProductProps[];
}

export const Gallery: FC<CardProps> = ({ productProps }) => {

    return (
        <>
            <div className="content d-flex justify-content-right flex-wrap" style={{width: '60rem'}}>
                {productProps.map((product, i) => (
                    <div key={i} className="img-box p-3">
                        <ProductCard productProps={product} />
                    </div>
                ))}
            </div>
        </>
    );
}