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
import { jwtDecode } from 'jwt-decode';

export const LogIn = () => {
    const { getUser } = useAuthUser();

    type FormValues = {
        username: string;
        password: string;
    };

    type FormErrors = {
        username?: null | string;
        password?: null | string;
    };

    type Rule = (value: string) => string | undefined;

    const validationRules: Record<keyof FormValues, Rule[]> = {
        username: [
            (v) => (!v.trim() ? "Username is required" : undefined),
        ],
        password: [
            (v) => (!v.trim() ? "Password is required" : undefined),
        ],
    };

    const [errors, setErrors] = useState<FormErrors>({});

    const validateField = (name: keyof FormValues, value: string) => {
        const rules = validationRules[name];
        for (const rule of rules) {
            const error = rule(value);
            if (error) return error;
        }
    };

    const specificValidation = (values: FormValues) => {
        const newErrors: FormErrors = {};

        (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
            const err = validateField(key, values[key]);
            newErrors[key] = err ? err : null;
        });

        setErrors(newErrors);

        return Object.values(newErrors).every((err) => err === null);
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const newUser = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        }

        if (specificValidation(newUser)) {
            try {
                await getUser(newUser);
            } catch (error: unknown) {
                Swal.fire("theres a problem!", "cant find user", "error");
                console.error(`${error} couldn't find user.`);
            }
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
                                type="text"
                                name="username"
                                isInvalid={!!errors.username}
                                isValid={errors.username === null} />
                            <Form.Label column sm="2">Username</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} style={{ marginTop: '2rem' }} className="mb-3 justify-content-center">
                    <Col sm="5">
                        <InputGroup>
                            <Form.Control type="password" name="password" isInvalid={!!errors.password} isValid={errors.password === null} />
                            <Form.Label column sm="2">Password</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Sign in
                </Button>
            </Form>
        </div>
        <GoogleLogin onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
        }} onError={() => console.log("loggin faled")} auto_select={true}/>
            <div>
                <p>Dont have an account? Sign up</p>
            </div></>
    );
}

