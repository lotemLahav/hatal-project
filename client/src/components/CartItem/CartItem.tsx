import { FC } from "react";
import { ProductProps } from "../../utils/types";

interface CartItemProps {
    cartItemProps: ProductProps;
}

export const CartItem: FC<CartItemProps> = ({ cartItemProps }) => {

    return (
            <div className="card mb-3 position-relative overflow-hidden p-0" style={{ width: "300px", height: "100px" }}>
                <button
                    className="position-absolute border-0 bg-transparent p-0"
                    style={{
                        top: "5px",
                        right: "5px",
                        fontSize: "20px",
                        lineHeight: "1",
                        color: "#999",
                        zIndex: 10
                    }}
                    aria-label="Close"
                >
                    ×
                </button>

                <div className="row g-0 h-100 m-0">
                    <div className="col-9 p-2 d-flex flex-column justify-content-end align-items-end h-100">
                        <h5 className="card-text mb-1" style={{ color: "#1E3D5A" }}>{cartItemProps.name}</h5>
                        <h5 className="card-text mb-1">
                            <strong style={{ color: "#F39C42" }}>{cartItemProps.price}₪</strong>
                        </h5>
                    </div>

                    <div className="col-3 p-0 h-100">
                        <img
                            src={cartItemProps.image_url}
                            className="rounded-end"
                            alt="hi"
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "block"
                            }}
                        />
                    </div>
                </div>
            </div>
        );
};