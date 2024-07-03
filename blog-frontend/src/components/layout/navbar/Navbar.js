import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Nav.css';
import Urls from "context/Urls";
import { GetUserInfo } from "api/User";
import { AlertContext } from "context/AlertContext";

const NavBar = () => {
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    const { token, logout } = useContext(AuthContext);
    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        GetUserInfo(token)
            .then(response => {
                if (!response.error) {
                    setUsername(response.username);
                    return
                }

                addAlert(response.error.message, "danger");
                
            })
            .catch(err => console.error(err));
    }, [token]);

    const logoutUser = () => {
        logout();

        addAlert("Successfully logged out user!", "success");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="nav-title navbar-brand mb-0 h1" onClick={() => navigate(Urls.Home)}>Go Blog!</span>
                    {token ? (
                        <div className="d-flex">
                            <a
                                className="username-span navbar-text text-capitalize text-light"
                                onClick={() => navigate(Urls.UserProfile.replace(":id", "me"))}
                                >
                                {username}
                            </a>
                            <button
                                className="btn btn-outline-light me-2"
                                type="button"
                                onClick={() => logoutUser()}
                                >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <button 
                                className="btn btn-outline-light me-2"
                                type="button"
                                onClick={() => navigate(Urls.RegisterUser)}
                                >
                                Register
                            </button>
                            <button
                                className="btn btn-outline-light me-2"
                                type="button"
                                onClick={() => navigate(Urls.LoginUser)}
                                >
                                Login
                            </button>
                        </div>
                    )}
            </div>
        </nav>
    );
}

export default NavBar;