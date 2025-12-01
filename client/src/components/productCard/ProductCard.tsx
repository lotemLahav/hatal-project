import { FC } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

export const ProductCard: FC = () => {


    return (<>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="jcs.jfif" />
            <Card.Body>
                <Card.Title style={{ textAlign: 'left', color: "#1E3D5A" }}>jesus Christ Superstar</Card.Title>
                <Card.Text style={{ textAlign: 'left', color: "#F39C42" }}>
                    duration: 1:30
                </Card.Text>
            </Card.Body>
            <ListGroup.Item>
                <div style={{ textAlign: 'left', color: "#1E3D5A", fontSize: "40px" }}>45₪</div></ListGroup.Item>
            <Button type="submit" className="w-100 mb-3 rounded-pill">
                Add To Cart
            </Button>
        </Card>
    </>)
}