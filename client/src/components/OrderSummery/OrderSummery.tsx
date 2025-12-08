/* eslint-disable react/jsx-key */
import { FC, useState } from "react";
import { FullOrder, ProductProps } from "../../utils/types";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useGetOrderItemsByOrder } from "../../api/hooks/orderItem/useGetOrderItemsByOrder";
import { MultipleCartItems } from "../MultipleCartItem";


interface OrderSummeryProps {
    orderSummeryProps: FullOrder;
}

export const OrderSummery: FC<OrderSummeryProps> = ({ orderSummeryProps }) => {
    const { fetchOrderItemsByOrder } = useGetOrderItemsByOrder();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderItems, setOrderItems] = useState<ProductProps[]>([]);

    const handleClick = async (order: FullOrder) => {
        try {
            const data: ProductProps[] = await fetchOrderItemsByOrder(order.id);
            setOrderItems(data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch order items:", error);
        }
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const orderFields = [
        { name: "order id", value: orderSummeryProps.id },
        { name: "date", value: new Date(orderSummeryProps.created_at).toLocaleDateString() },
        { name: "total price", value: orderSummeryProps.price },
        { name: "status", value: orderSummeryProps.status },

    ];

    return (
        <>
            <button
                type="button"
                className="border-0 bg-transparent p-0"
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(orderSummeryProps)}
                data-bs-toggle="modal"
                data-bs-target={`#orderModal${orderSummeryProps.id}`}
            >
                <div className="d-flex card position-relative overflow-hidden border-0" style={{ width: "500px", height: "60px" }}>
                    <div className="row g-0 h-100 m-0 flex-row-reverse">
                        {orderFields.map(field =>
                            <div className="col-3 p-2 d-flex flex-column justify-content-end align-items-end h-100">
                                <p className="card-text mb-1" style={{ color: "#F39C42" }}>{field.name}</p>
                                <p className="card-text mb-1">
                                    <strong style={{ color: "#1E3D5A" }}>{field.value}</strong>
                                </p>
                            </div>
                        )}
                        <div className="col-1 p-2 d-flex flex-column justify-content-center align-items-center h-100">
                            <i className="bi bi-caret-right h4"></i>
                        </div>
                    </div>
                </div>
                <div>
                    <hr className="border border-2 w-100" />
                </div>
            </button>

            {isModalOpen && (
                <div
                    className="modal fade show d-block"
                    role="dialog"
                    onClick={handleCloseModal}
                >
                    <div
                        className="modal-dialog"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">
                            <div className="modal-header d-flex flex-row justify-content-between">
                                <div>
                                    <button type="button" className="close" onClick={handleCloseModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div>
                                    <h5 className="modal-title ">Order {orderSummeryProps.id}</h5>
                                </div>
                            </div>
                            <div className="modal-body  d-flex justify-content-center align-items-center">
                                <MultipleCartItems productProps={orderItems} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};