import { AuthContext } from "context/AuthContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const { token, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Go Blog!</span>
                    {token ? (
                        <div className="d-flex">
                            <button
                                className="btn btn-outline-light me-2"
                                type="button"
                                onClick={() => logout()}
                                >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <button 
                                className="btn btn-outline-light me-2"
                                type="button"
                                onClick={() => navigate("/register")}
                                >
                                Register
                            </button>
                            <button
                                className="btn btn-outline-light me-2"
                                type="button"
                                onClick={() => navigate("/login")}
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