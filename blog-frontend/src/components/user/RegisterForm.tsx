import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import './Login.css';
import { RegisterUser } from "@api/User";
import { ErrorResponse, UserParams } from "@api/Utils";
import { useAlerts } from "@context/AlertContext";
import routes from "@routes/Routes";

const RegisterForm: React.FC = () => {
    const [registerForm, setRegisterForm] = useState<UserParams & { confirmPassword: string }>({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const { addAlert } = useAlerts();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (registerForm.password.replace(" ", "").length === 0 || registerForm.username.replace(" ", "").length === 0) {
            addAlert("Password and/or username cannot be empty!", "danger");
            return;
        }

        if (registerForm.password !== registerForm.confirmPassword) {
            addAlert("Password in the confirm field doesn't match the password!", "warning");
            return;
        }

        RegisterUser(registerForm)
            .then((response: ErrorResponse | any) => {
                if ("error" in response) {
                    addAlert(response.error.message, "danger");
                    return;
                }

                addAlert("Successfully registered user account! Login to access your account.", "success");
                navigate(routes.LoginUser.path as string);
            });
    }

    const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm((prev: UserParams & { confirmPassword: string }) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    return (
        <Form className="register-form justify-content-center" onSubmit={handleSubmit}>
            <h3 className="text-uppercase">Register</h3>
            <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleFormValueChange}
                />
            <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleFormValueChange}
                />
            <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleFormValueChange}
                />
            <Button variant="primary" className="text-uppercase" type="submit">Register</Button>
        </Form>
    );
}

export default RegisterForm;