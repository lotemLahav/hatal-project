/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useGetOrdersByUser } from "../api/hooks/order/useGetOrdersByUser";
import { FullOrder, OrderStatus } from "../utils/types";
import Swal from "sweetalert2";
import { OrderSummery } from "../components/OrderSummery/OrderSummery";

export const PersonalPage = () => {
    const username = localStorage.getItem('username');
    const { fetchOrdersByUser } = useGetOrdersByUser();
    const [orders, setOrders] = useState<FullOrder[]>([]);

    const fetchOrders = async () => {
        try {
            setOrders(await fetchOrdersByUser(username as string));
        } catch (error) {
            Swal.fire("There's a problem!", "Can't get Order", "error");
            console.error(`${error} couldn't get Orders.`);
        }
    }

    useEffect(() => {
        if (username) {
            fetchOrders();
        }
    }, [username]);

    const currentOrders = orders.filter(order => order.status !== OrderStatus.CLOSED);
    const pastOrders = orders.filter(order => order.status === OrderStatus.CLOSED);
    const orderLists = [
        { name: 'Open Orders', list: currentOrders },
        { name: 'Order History', list: pastOrders },
    ]

    return (
        <>
            <div style={{ textAlign: "left", padding: '1rem' }}>
                <p className="m-0" style={{ fontSize: "4rem", color: "#1E3D5A" }}>My Orders</p>
                <h5 style={{ color: "#F39C42" }}>:number of orders {orders.length}</h5>
            </div>
            <div className="d-flex flex-row-reverse justify-content-between">
                <div>
                    {orderLists.map(orderList =>
                        <div style={{ textAlign: "left", padding: '1rem' }}>
                            <h4 className="m-0 p-1" style={{ color: "#1E3D5A" }}>{orderList.name}</h4>

                            <div className="overflow-y-auto" style={{ maxHeight: "260px", overflowX: "hidden" }}>
                                {orderList.list.map((order) =>
                                    <div key={order.id}>
                                        <OrderSummery orderSummeryProps={order} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
};
