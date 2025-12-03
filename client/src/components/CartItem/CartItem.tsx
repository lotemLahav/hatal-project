import { FC } from "react";
import { ProductProps } from "../../utils/types";
import { useCart } from "../../context/CartContext/useCart";

interface CartItemProps {
    cartItemProps: ProductProps;
}

export const CartItem: FC<CartItemProps> = ({ cartItemProps }) => {
    const { cartProductsCallback, cartProducts } = useCart();

    const handleClick = () => {
        const updatedCart = cartProducts?.filter(item => item.name !== cartItemProps.name) || [];
        cartProductsCallback(updatedCart);
    };

    return (
        <div className="card position-relative overflow-hidden" style={{ width: "300px", height: "100px" }}>
            <button
                className="position-absolute border-0 bg-transparent p-0"
                style={{
                    top: "5px",
                    right: "5px",
                    fontSize: "20px",
                    lineHeight: "1",
                    color: "#999",
                    cursor: "pointer",
                    zIndex: 9999,
                    pointerEvents: "auto"
                }}
                aria-label="Close"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("BUTTON CLICKED!");
                    handleClick();
                }}
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