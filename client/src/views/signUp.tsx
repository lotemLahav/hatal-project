import { User } from "../utils/types";
import { useUser } from "../context/userContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormEvent, useState } from "react";

export const SignUp = () => {
    const { selectedUsername } = useUser();

    type FormValues = {
        username: string;
        password: string;
        email: string;
        phone: string;
    };

    type FormErrors = {
        username?: null | string;
        password?: null | string;
        email?: null | string;
        phone?: null | string;
    };

    type Rule = (value: string) => string | undefined;

    const validationRules: Record<keyof FormValues, Rule[]> = {
        username: [
            (v) => (!v.trim() ? "Username is required" : undefined),
            (v) => (!/[a-zA-Z]/.test(v) ? "Username must contain at least one letter" : undefined),
        ],
        email: [
            (v) => (!v.trim() ? "Email is required" : undefined),
            (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Invalid email" : undefined)
        ],
        password: [
            (v) => (!v.trim() ? "Password is required" : undefined),
            (v) => (v.replace(/[^0-9]/g, "").length < 3 ? "Password must include at least three digits" : undefined),
            (v) => (v.replace(/[^a-zA-Z]/g, "").length < 3 ? "Password must contain at least 3 letters" : undefined),
            (v) => (v.replace(/[a-zA-Z0-9]/g, "").length < 1 ? "Password must contain at least 1 special character" : undefined),
        ], phone: [
            (v) => (!v.trim() ? "Phone number is required" : undefined),
            (v) => (!/^[0-9]+$/.test(v) ? "phone number must be numeric" : undefined),
            (v) => (v.length !== 10 ? "phone number is 10 digits" : undefined),
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
            if (err) {
                newErrors[key] = err;
            } else {
                newErrors[key] = null;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            return true;
        }

        return false;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const newValues = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
            email: (formData.get("email") as string) || "",
            phone: (formData.get("phone") as string) || "",
        }

        if (specificValidation(newValues)) {
            // api
            return;
        }
    };


    return (
        <div className=" justify-content-center text-center">
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3 justify-content-center">
                    <Col sm="5">
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                name="username"
                                isInvalid={!!errors.username}
                                isValid={errors.username === null}
                            />
                            <Form.Label column sm="2">Username</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">
                                Looks good!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center">
                    <Col sm="5">
                        <InputGroup hasValidation>
                            <Form.Control type="password" name="password" isInvalid={!!errors.password} isValid={errors.password === null} />
                            <Form.Label column sm="2">Password</Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center">
                    <Col sm="5">
                        <InputGroup hasValidation>
                            <Form.Control type="text" name="email" isInvalid={!!errors.email} isValid={errors.email === null}/>
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </InputGroup >
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center">
                    <Col sm="5">
                        <InputGroup hasValidation>
                            <Form.Control
                                type="tel" name="phone" isInvalid={!!errors.phone} isValid={errors.phone === null} />
                            <Form.Label column sm="2">
                                Phone Number
                            </Form.Label>
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
