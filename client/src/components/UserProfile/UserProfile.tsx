import { FC, FormEvent, useState } from "react";
import { FullUser } from "../../utils/types";
import { Button, Form, InputGroup } from "react-bootstrap";

interface UserProps {
    user: FullUser | null;
}

export const UserProfile: FC<UserProps> = ({ user }) => {
    type FormValues = {
        phone: string;
        oldPassword: string;
        newPassword: string;
    };

    type FormErrors = {
        phone?: null | string;
        oldPassword?: null| string;
        newPassword?: null | string;
    };

    type Rule = (value: string) => string | undefined;

    const validationRules: Record<keyof FormValues, Rule[]> = {
         phone: [
            (v) => (!/^[0-9]+$/.test(v) ? "phone number must be numeric" : undefined),
            (v) => (v.length !== 10 ? "phone number is 10 digits" : undefined),
        ],oldPassword: [
            (v) => (v.replace(/[^0-9]/g, "").length < 3 ? "Password must include at least three digits" : undefined),
            (v) => (v.replace(/[^a-zA-Z]/g, "").length < 3 ? "Password must contain at least 3 letters" : undefined),
            (v) => (v.replace(/[a-zA-Z0-9]/g, "").length < 1 ? "Password must contain at least 1 special character" : undefined),
        ],newPassword: [
            (v) => (v.replace(/[^0-9]/g, "").length < 3 ? "Password must include at least three digits" : undefined),
            (v) => (v.replace(/[^a-zA-Z]/g, "").length < 3 ? "Password must contain at least 3 letters" : undefined),
            (v) => (v.replace(/[a-zA-Z0-9]/g, "").length < 1 ? "Password must contain at least 1 special character" : undefined),
        ],
    };

    const [errors, setErrors] = useState<FormErrors>({});

    const validateField = (name: keyof FormValues, value: string) => {
        if (!value) return null;
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
            phone: (formData.get("phone") as string) || "",
            newPassword: (formData.get("newPassword") as string) || "",
            oldPassword: (formData.get("oldPassword") as string) || "",
        }

        if (specificValidation(newUser)) {
            // try {
            //     await postUser(newUser);
            //     navigate('/home');
            // } catch (error: unknown) {
            //     Swal.fire("theres a problem!", "cant create user", "error");
            //     console.error(`${error} couldn't save user.`);
            // }
        }
    }

    return (
        <div className="container-fluid">
            <div className="row flex-row justify-content-center">
                <div className="col-md-8 col-lg-6 order-md-2 order-2 d-flex flex-column justify-content-center p-5" style={{ width: '25%' }}>
                    <h2 className="p-1 mb-3">User Info</h2>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control
                                    style={{ textAlign: "left" }}
                                    type="password"
                                    name="password"
                                    placeholder="old password"
                                    isInvalid={!!errors.oldPassword}
                                    className="w-100"
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em', textAlign: 'end' }}>
                                    {errors.oldPassword}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control
                                    style={{ textAlign: "left" }}
                                    type="password"
                                    name="password"
                                    placeholder="new password"
                                    isInvalid={!!errors.newPassword}
                                    className="w-100"
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em', textAlign: 'end' }}>
                                    {errors.newPassword}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup hasValidation>
                                <Form.Control
                                    style={{ textAlign: "left" }}
                                    type="text"
                                    name="phone"
                                    placeholder={user?.phone ?? "Phone number - missing"}
                                    isInvalid={!!errors.phone}
                                    className="w-100"
                                />
                                <Form.Control.Feedback type="invalid" style={{ display: 'block', minHeight: '1.25em', textAlign: 'end' }}>
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <button type="button" className="btn btn-link">Change Password</button>

                        <Button type="submit" className="w-100 mb-3">
                            Update
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}