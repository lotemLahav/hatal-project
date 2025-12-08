/* eslint-disable react/jsx-key */
import { Button, Card } from "react-bootstrap";
import { MultipleCartItems } from "../components/MultipleCartItem";
import { useCart } from "../context/CartContext/useCart";
import { useNavigate } from 'react-router-dom';
import { usePostOrder } from "../api/hooks/order/usePostOrder";
import { usePostOrderItem } from "../api/hooks/orderItem/usePostOrderItem";
import { FullOrder, Order, OrderItem } from "../utils/types";
import Swal from "sweetalert2";
import { useUser } from "../context/userContext";

export const Checkout = () => {
    const { cartProducts, cartProductsCallback } = useCart();
    const { username } = useUser();
    const servicePrice = 10;
    const navigate = useNavigate();
    const { postOrder } = usePostOrder();
    const { postOrderItem } = usePostOrderItem();

    const totalPrice = () => {
        if (cartProducts) {
            return cartProducts?.reduce((currentValue, item) => item.price + currentValue, 0) + servicePrice;
        } else {
            return servicePrice;
        }
    }

    const handleClick = async () => {
        const order: Order = {
            created_at: new Date(),
            price: totalPrice(),
            service_price: servicePrice,
            username: username as string
        }

        try {
            const newOrder: FullOrder = await postOrder(order);

            //make orderItems
            for (const product of cartProducts ?? []) {
                const item: OrderItem = {
                    order: newOrder.id,
                    product: product.id,
                    price: product.price,
                };

                try {
                    await postOrderItem(item);
                } catch (error) {
                    Swal.fire("There's a problem!", "Can't create OrderItem", "error");
                    console.error(`${error} couldn't create OrderItem.`);
                }
            }
            cartProductsCallback([]);
            navigate('/profile')

        } catch (error: unknown) {
            Swal.fire("There's a problem!", "Can't create Order", "error");
            console.error(`${error} couldn't create Order.`);
        }
    }

    const priceFields = [
        { name: ':Price', value: cartProducts?.reduce((currentValue, item) => item.price + currentValue, 0) },
        { name: ':Service Fee', value: servicePrice },
        { name: ':Total Price', value: totalPrice() },
    ]

    return (
        <>
            <div className="container-fluid p-0" style={{ height: "100vh", padding: "2rem" }}>
                <div style={{ textAlign: "left", padding: '1rem' }}>
                    <p className="m-0" style={{ fontSize: "4rem", color: "#1E3D5A" }}>Checkout</p>
                    <h5 style={{ color: "#F39C42" }}>number of items {cartProducts?.length}</h5>
                </div>
                <hr className="border border-2 w-100" />

                <div className="d-flex justify-content-around">
                    {!cartProducts || cartProducts.length === 0 ? (
                        <h1 className="justify-content-center">Your cart is empty</h1>
                    ) : (
                        <>
                            <Card style={{ width: "40%", alignSelf: "center" }}>
                                <Card.Body>
                                    {priceFields.map(field =>
                                        <><Card.Title className="d-flex flex-row justify-content-between">
                                            <p style={{ color: "#F39C42" }}>{field.value}₪</p>
                                            <p style={{ color: "#1E3D5A" }}>{field.name}</p>
                                        </Card.Title>
                                        <hr className="border border-2 w-100" /></>
                                    )}
                                    <div className="d-flex gap-2 justify-content-between">
                                        <Button variant="primary" onClick={handleClick} size="sm">Continue To Payment</Button>
                                        <Button variant="light" className="border border-primary" onClick={() => navigate('/home')} size="sm">Continue Shopping</Button>
                                    </div>
                                </Card.Body>
                            </Card>

                            <MultipleCartItems productProps={cartProducts} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};