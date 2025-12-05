/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormEvent, useState, useEffect } from "react";
import { useAuthUser } from "../api/hooks/user/useAuthUser";
import Swal from "sweetalert2";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken, GoogleJwtPayload, UserAuth } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

export const LogIn = () => {
    
    const { getUser } = useAuthUser();
    const navigate = useNavigate();
    const { userCallback } = useUser();
    const [errors, setErrors] = useState<FormErrors>({});

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
        username: [(v) => (!v.trim() ? "Username is required" : undefined)],
        password: [(v) => (!v.trim() ? "Password is required" : undefined)],
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                userCallback(decoded.username)();
                navigate('/home')
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('access_token');
                sessionStorage.removeItem('access_token');
            }
        }
    }, [userCallback]);


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
        const userData = {
            username: (formData.get("username") as string) || "",
            password: (formData.get("password") as string) || "",
        };

        if (specificValidation(userData)) {
            try {
                await getUser(userData);
                navigate('/home');
            } catch (error: unknown) {
                Swal.fire("There's a problem!", "Can't find user", "error");
                console.error(`${error} couldn't find user.`);
            }
        }
    };

    const onSuccess = async (credentialResponse: CredentialResponse) => {
        const userInfo = jwtDecode(credentialResponse.credential!) as GoogleJwtPayload;
        const newUser: UserAuth = {
            username: userInfo.name,
            password: userInfo.email
        }
        try {
            await getUser(newUser);
            navigate('/home');
        } catch (error: unknown) {
            Swal.fire("There's a problem!", "Can't find user", "error");
            console.error(`${error} couldn't find user.`);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100 flex-row">
                <div className="col-md-5 order-md-2 order-2 d-flex flex-column justify-content-center px-5">
                    <h1 className="mb-4">Welcome Back!</h1>
                    <p>Please enter your details</p>

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
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em' }}>
                                    {errors.username || <span>&nbsp;</span>}
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
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em' }}>
                                    {errors.password || <span>&nbsp;</span>}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button type="submit" className="w-100 mb-3">Sign in</Button>

                        <div className="d-flex justify-content-center mt-2 w-100">
                            <GoogleLogin
                                onSuccess={onSuccess}
                                onError={() => console.log("Login failed")}
                                auto_select={true}
                                text="signup_with"
                                width="100%"
                            />
                        </div>

                        <p className="mt-3 text-center">
                            Don't have an account?{" "}
                            <span
                                style={{ color: "#0d6efd", cursor: "pointer", textDecoration: "underline" }}
                                onClick={() => navigate("/signUp")}
                            >
                                Sign up
                            </span>
                        </p>
                    </Form>
                </div>

                <div className="col-md-6 order-md-1 order-1 px-5">
                    {/* <img
                        src="https://via.placeholder.com/800x1000"
                        alt="Login Illustration"
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                    /> */}
                </div>
            </div>
        </div>
    );
};