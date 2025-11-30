import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormEvent, useState } from "react";
import { usePostUser } from "../api/hooks/usePostUser";
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';

export const SignUp = () => {
    const { postUser } = usePostUser();

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
            email: (formData.get("email") as string) || "",
            phone: (formData.get("phone") as string) || "",
        }

        if (specificValidation(newUser)) {
            try {
                await postUser(newUser);
            } catch (error: unknown) {
                Swal.fire("theres a problem!", "cant create user", "error");
                console.error(`${error} couldn't save user.`);
            }
        }
    }


    return (
        <div className="container-fluid">
            <div className="row vh-100 flex-row">


                <div className="col-md-5 order-md-2 order-2 d-flex flex-column justify-content-center">
                    <h1 className="mb-4">Sign Up</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control
                                    style={{ textAlign: "left" }}
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    isInvalid={!!errors.username}
                                    isValid={errors.username === null}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em', textAlign: 'end'}}>
                                    {errors.username}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control
                                    style={{ textAlign: "left" }}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    isInvalid={!!errors.password}
                                    isValid={errors.password === null}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em', textAlign: 'end'}}>
                                    {errors.password}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control
                                    style={{ textAlign: "left" }}
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    isInvalid={!!errors.email}
                                    isValid={errors.email === null}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em', textAlign: 'end'}}>
                                    {errors.email}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control
                                    style={{ textAlign: "left" }}
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    isInvalid={!!errors.phone}
                                    isValid={errors.phone === null}
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em', textAlign: 'end'}}>
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button type="submit" className="w-100 mb-3">
                            Submit
                        </Button>

                        <div style={{ width: "100%" }} className="d-flex justify-content-center mt-2">
                            <GoogleLogin
                                onSuccess={(credentialResponse) => console.log(credentialResponse)}
                                onError={() => console.log("login failed")}
                                auto_select={true}
                                text="signup_with"
                                width="100%"
                            />
                        </div>

                        <p>already have an account? sign in</p>
                    </Form>
                </div>
                <div className="col-md-6 order-md-1 order-1 px-5">
                    {/* <img
                        src="https://via.placeholder.com/800x1000"
                        alt="Signup Illustration"
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                    /> */}
                </div>

            </div>
        </div>
    );

}

