import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./Profile.css";
import { GetBasicUserInfo, GetUserInfo } from "@api/User";
import { ErrorResponse, UserInfo } from "@api/Utils";
import { useAuth } from "@context/AuthContext";
import { useAlerts } from "@context/AlertContext";

const UserProfile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>();

    const { id } = useParams();
    const { token } = useAuth();
    const { addAlert } = useAlerts();

    useEffect(() => {
        if (token !== null) {
            GetUserInfo(token, id === "me" ? "" : String(id))
                .then((response: ErrorResponse | UserInfo) => {
                    if ("error" in response) {
                        addAlert(response.error.message, "danger");
                        return;
                    }

                    setUserInfo({
                        username: response.username,
                        id: response.id
                    });
                });
        } else {
            GetBasicUserInfo(Number(id))
                .then((response: ErrorResponse | UserInfo) => {
                    if ("error" in response) {
                        addAlert(response.error.message, "danger");
                        return;
                    }

                    setUserInfo({
                        username: response.username,
                        id: response.id
                    });
                });
        }
    }, [token, id]);

    return (
        <div className="profile-container">
            <h3 className="text-uppercase">User Profile</h3>
            <Card>
                <Card.Body>
                    <Card.Title as="h5" className="text-capitalize">
                        {userInfo?.username}
                    </Card.Title>
                    <Card.Subtitle as="h6" className="mb-2 text-muted">
                        ID: {userInfo?.id}
                    </Card.Subtitle>
                    <Card.Text>
                        some description...
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default UserProfile;