import { FC } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { ProductProps } from "../../utils/types";

interface ProductCardProps {
  productProps: ProductProps;
}

export const ProductCard: FC<ProductCardProps> = ({ productProps }) => {


    return (<>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="jcs.jfif" />
            <Card.Body>
                <Card.Title style={{ textAlign: 'left', color: "#1E3D5A" }}>{productProps.name}</Card.Title>
                <Card.Text style={{ textAlign: 'left', color: "#F39C42" }}>
                    duration: {productProps.duration}
                </Card.Text>
            </Card.Body>
            <ListGroup.Item>
                <div style={{ textAlign: 'left', color: "#1E3D5A", fontSize: "40px" }}>{productProps.price}₪</div>
                <Button type="submit" className="w-100 mb-3 rounded-pill">
                    Add To Cart
                </Button>
            </ListGroup.Item>
        </Card>
    </>)
}