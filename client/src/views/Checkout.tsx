import { Button, Card } from "react-bootstrap";
import { MultipleCartItems } from "../components/MultipleCartItem";
import { useCart } from "../context/CartContext/useCart";
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
    const { cartProducts } = useCart();
    const servicePrice = 10;
    const navigate = useNavigate();

    const handleClick = () => {
        
    }

    return (
        <>
            <div className="container-fluid p-0" style={{ height: "100vh", padding: "2rem" }}>
                <div className="d-flex flex-row gap-4 align-items-start w-100 h-100">

                    {/* RIGHT SIDE — Card */}
                    <Card style={{ width: "40%", alignSelf: "center", marginRight: "15%" }}>
                        <Card.Body>
                            <Card.Title className="d-flex flex-row justify-content-between" >
                                <p style={{ color: "#F39C42" }}>{cartProducts?.reduce((currentValue, item) => item.price + currentValue, 0)}₪</p>
                                <p style={{ color: "#1E3D5A" }}>:Price</p>
                            </Card.Title>
                            <hr className="border border-2 w-100" />
                            <Card.Title className="d-flex flex-row justify-content-between" >
                                <p style={{ color: "#F39C42" }}>{servicePrice}₪</p>
                                <p style={{ color: "#1E3D5A" }}>:Service Price</p>
                            </Card.Title>
                            <hr className="border border-2 w-100" />
                            <Card.Title className="d-flex flex-row justify-content-between" >
                                <p style={{ color: "#F39C42" }}>{!cartProducts ? (servicePrice) : (
                                    cartProducts?.reduce((currentValue, item) => item.price + currentValue, 0) + servicePrice)}₪</p>
                                <p style={{ color: "#1E3D5A" }}>:Total Price</p>
                            </Card.Title>
                            <div className="d-flex gap-2">
                                <Button className="flex-fill" onClick={handleClick} size="sm">Payment</Button>
                                <Button className="flex-fill" onClick={() => navigate('/home')} size="sm">Continue Shopping</Button>
                            </div>


                        </Card.Body>
                    </Card>

                    {/* LEFT COLUMN — Checkout + Cart Items */}
                    <div className="d-flex flex-column flex-grow-1 align-items-end p-2">
                        <p className="m-0" style={{ fontSize: "4rem", color: "#1E3D5A" }}>Checkout</p>
                        <h5 style={{ color: "#F39C42" }}>number of items {cartProducts?.length}</h5>
                        <hr className="border border-2 w-100" />
                        <MultipleCartItems productProps={cartProducts} />
                    </div>

                </div>
            </div>

        </>
    );
};
