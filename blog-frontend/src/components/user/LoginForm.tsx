import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import './Login.css';
import { useAuth } from "@context/AuthContext";
import { useAlerts } from "@context/AlertContext";
import { ErrorResponse, UserParams } from "@api/Utils";
import { LoginUser } from "@api/User";
import routes from "@routes/Routes";

const LoginForm: React.FC = () => {
    const [loginForm, setLoginForm] = useState<UserParams>({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { saveToken } = useAuth();
    const { addAlert } = useAlerts();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (loginForm.username.replace(" ", "").length === 0 || loginForm.password.replace(" ", "").length === 0) {
            addAlert("Username and/or password cannot be empty!", "danger");
            return;
        }

        LoginUser({
            ...loginForm
        })
            .then((response: ErrorResponse | any) => {
                if ("error" in response) {
                    addAlert(response.error.message, "danger");
                    return;
                }

                saveToken(response.token);

                navigate(routes.Home.path as string);
            });
    }

    const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev: UserParams) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    return (
        <Form className="register-form justify-content-center" onSubmit={handleSubmit}>
            <h3 className="text-uppercase">Login</h3>
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
            <Button variant="primary" className="text-uppercase" type="submit">Login</Button>
        </Form>
    );
}

export default LoginForm;