import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './User.css';
import { LoginUser } from "api/User";
import { AuthContext } from "context/AuthContext";
import { AlertContext } from "context/AlertContext";
import Urls from "context/Urls";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { saveToken } = useContext(AuthContext);
    const { addAlert } = useContext(AlertContext);
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (username.replace(" ", "").length === 0 || password.replace(" ", "").length === 0) {
            addAlert("Username and/or password cannot be empty!", "danger");
            return;
        }

        LoginUser({
            username,
            password
        })
        .then(response => {
            if (!response.error) {
                // save the jwt token
                saveToken(response.token);

                navigate(Urls.Home);
            }

            // handle error
        })
        .catch(err => {
            alert(`error registering user due to ${err}!`)
        });

    }

    return (
        <form className="register-form justify-content-center" onSubmit={handleSubmit}>
            <h3 className="text-uppercase">Login</h3>
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
            <button className="btn btn-primary text-uppercase" type="submit">Login</button>
        </form>
    );
}

export default LoginForm;