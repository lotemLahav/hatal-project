import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { ProductProps } from "../../utils/types";
import { useCart } from "../../context/CartContext/useCart";

interface ProductCardProps {
  productProps: ProductProps;
}

export const ProductCard: FC<ProductCardProps> = ({ productProps }) => {
    const { cartProductsCallback, cartProducts } = useCart();

    const handleSubmit = () => {
        if(cartProducts){
            cartProducts.push(productProps);
            cartProductsCallback(cartProducts);
        } else{
            const productArray: ProductProps[] = [productProps];
            cartProductsCallback(productArray);
        }
    };

    return (<>
        <Card className="border border-dark rounded" style={{ width: '15rem', height:'24rem' }}>
            <Card.Img variant="top" src={productProps.image_url} width={200} height={200}/>
            <Card.Body>
                <Card.Title style={{ textAlign: 'left', color: "#1E3D5A", fontSize: '20px' }}>{productProps.name}</Card.Title>
                <Card.Text style={{ textAlign: 'left', color: "#F39C42", fontSize: '15px' }}>
                    duration: {productProps.duration}
                </Card.Text>
                <hr style={{ border: "1px solid black", margin: "8px 0" }} />
                <div style={{ textAlign: 'left', color: "#1E3D5A", fontSize: "20px" }}>{productProps.price}₪</div>
                <Button type="submit" onClick={handleSubmit}  className="w-100 mb-3 rounded-pill">
                    Add To Cart
                </Button>
                </Card.Body>
        </Card>
    </>)
}