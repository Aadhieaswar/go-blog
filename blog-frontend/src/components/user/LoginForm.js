import { LoginUser } from "api/User";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './User.css';
import { AuthContext } from "context/AuthContext";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { saveToken } = useContext(AuthContext);
    
    const handleSubmit = (e) => {
        e.preventDefault()

        LoginUser({
            username,
            password
        })
        .then(response => {
            if (!response.error) {
                // save the jwt token
                saveToken(response.token);

                navigate("/");
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