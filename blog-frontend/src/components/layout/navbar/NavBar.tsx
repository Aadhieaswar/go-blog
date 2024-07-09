import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import './Nav.css';
import routes from "@routes/Routes";
import { useAlerts } from "@context/AlertContext";
import { useAuth } from "@context/AuthContext";
import { ErrorResponse, UserInfo } from "@api/Utils";
import { GetUserInfo } from "@api/User";

const NavBar: React.FC = () => {
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    const { token, logout } = useAuth();
    const { addAlert } = useAlerts();

    useEffect(() => {
        if (token !== null)
            GetUserInfo(token as string)
                .then((response: ErrorResponse | UserInfo) => {
                    if ('error' in response) {
                        addAlert(response.error.message, "danger");
                        return;
                    }

                    setUsername(response.username);
                });
    }, [token]);

    const logoutUser = () => {
        logout();

        addAlert("Successfully logged out user!", "success");
        navigate(routes.Home.path as string);
    }

    return (
        <Navbar expand="lg" className="bg-dark">
            <Container>
                <Navbar.Brand href={routes.Home.path} className="text-capitalize text-white">
                    <h4>Go Blog!</h4>
                </Navbar.Brand>
                <Nav className="d-flex">
                { token ? (
                    <>
                        <Nav.Link
                            className="username-span text-capitalize text-white"
                            href={(routes.UserProfile.path as string).replace(":id", "me")}
                            >
                            {username}
                        </Nav.Link>
                        <Button
                            className="me-2"
                            variant="outline-light"
                            onClick={() => logoutUser()}
                            >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button 
                            className="me-2"
                            variant="outline-light"
                            onClick={() => navigate(routes.RegisterUser.path as string)}
                            >
                            Register
                        </Button>
                        <Button
                            className="me-2"
                            variant="outline-light"
                            onClick={() => navigate(routes.LoginUser.path as string)}
                            >
                            Login
                        </Button>
                    </>
                )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;