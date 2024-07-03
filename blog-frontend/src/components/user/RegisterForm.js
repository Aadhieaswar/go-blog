import { RegisterUser } from "api/User";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './User.css';
import Urls from "context/Urls";
import { AlertContext } from "context/AlertContext";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { addAlert } = useContext(AlertContext);

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (password.replace(" ", "").length === 0 || username.replace(" ", "").length === 0) {
            addAlert("Password and/or username cannot be empty!", "danger");
            return;
        }

        if (password !== confirmPassword) {
            // action to say that the passwords mismatch
            addAlert("Password in the confirm field doesn't match the password!", "warning");
            return;
        }

        RegisterUser({
            username,
            password
        })
        .then(response => {
            if (!response.error) {
                navigate(Urls.LoginUser);
            }
        })
        .catch(err => {
            alert(`error registering user due to ${err}!`);
        });

    }

    return (
        <form className="register-form justify-content-center" onSubmit={handleSubmit}>
            <h3 className="text-uppercase">Register</h3>
            <input
                type="text"
                placeholder="Username"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                />
            <input
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                />
            <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            <button className="btn btn-primary text-uppercase" type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;