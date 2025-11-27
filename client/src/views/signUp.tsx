import { User } from "../utils/types";
import { useUser } from "../context/userContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "postcss";

export const SignUp = () => {
    const { selectedUsername } = useUser();

    return (
        <div className=" justify-content-center text-center">
            <h1>Sign Up</h1>
            <Form>
                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="username">
                    <Col sm="5">
                        <Form.Control type="text" placeholder="Username" />
                    </Col>
                    <Form.Label column sm="2">Username</Form.Label>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formBasicPassword">
                    <Col sm="5">
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                    <Form.Label column sm="2">Password</Form.Label>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="exampleForm.ControlInput1">
                    <Col sm="5">
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Col>
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formPhoneNumber">
                    <Col sm="5">
                        <Form.Control type="email" placeholder="phone" />
                    </Col>
                    <Form.Label column sm="2">
                        Phone Number
                    </Form.Label>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};
