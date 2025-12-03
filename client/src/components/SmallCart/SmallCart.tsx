import { FC } from "react";
import { MultipleCartItems } from "../MultipleCartItem";
import { ProductProps } from "../../utils/types";
import { Button } from "react-bootstrap";

interface CardProps { productProps: ProductProps[]; }

export const SmallCart: FC<CardProps> = ({ productProps }) => {
    return (
        <>
            <div>
                <div
                    className="content d-flex flex-column"
                    style={{
                        maxHeight: "420px", // 4 cards × 100px height + 20px spacing
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}
                >
                    <MultipleCartItems productProps={productProps}></MultipleCartItems>
                </div>
                <div className="container-fluid d-flex align-items-start align-text-start">
                    <h5 style={{ color: "#F39C42" }}>{productProps.reduce((currentValue, item) => item.price + currentValue, 0)}₪</h5>
                    <p>:total price</p>
                </div>
                <Button type="submit"  className="w-100 mb-3 rounded-pill">
                    Continue To Payment
                </Button>
            </div>
        </>
    );
};
