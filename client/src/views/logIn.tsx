import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormEvent, useState } from "react";
import { useAuthUser } from "../api/hooks/useAuthUser";
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';

export const LogIn = () => {
    const { getUser } = useAuthUser();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const newUser = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        }

        try {
            await getUser(newUser);
        } catch (error: unknown) {
            Swal.fire("theres a problem!", "cant find user", "error");
            console.error(`${error} couldn't find user.`);
        }
    }


    return (
        <><div className=" justify-content-center text-center">
            <div><h1>Welcome Back!</h1></div>
            <div><p>please enter your details</p></div>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} style={{ marginTop: '5rem' }} className="mb-3 justify-content-center">
                    <Col sm="5">
                        <InputGroup>
                            <Form.Control
                                required
                                type="text"
                                name="username" />
                            <Form.Label column sm="2">Username</Form.Label>
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} style={{ marginTop: '2rem' }} className="mb-3 justify-content-center">
                    <Col sm="5">
                        <InputGroup>
                            <Form.Control required type="password" name="password" />
                            <Form.Label column sm="2">Password</Form.Label>
                        </InputGroup>
                    </Col>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Sign in
                </Button>
            </Form>
        </div><div>
                <p>Dont have an account? Sign up</p>
            </div></>
    );
}

