import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { GetBasicUserInfo, GetUserInfo } from "api/User";
import { AlertContext } from "context/AlertContext";
import { AuthContext } from "context/AuthContext";

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState({});

    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        console.log(token);

        if (token !== null) {
            GetUserInfo(token, id === "me" ? "" : Number(id))
                .then(response => {
                    if (!response.error) {
                        setUserInfo({
                            username: response.username,
                            userId: response.id
                        });
                        return;
                    }

                    addAlert(response.error.message, "danger");
                })
                .catch(err => console.error(err));
        } else {
            GetBasicUserInfo(Number(id))
                .then(response => {
                    if (!response.error) {
                        setUserInfo({
                            username: response.username,
                            userId: response.id
                        });
                        return;
                    }

                    addAlert(response.error.message, "danger");
                })
                .catch(err => console.error(err));
        }
    }, [token, id]);

    return (
        <div className="profile-container">
            <h3 className="text-uppercase">User Profile</h3>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-capitalize">
                        {userInfo.username}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        ID: {userInfo.userId}
                    </h6>
                    <p className="card-text">
                        some description...
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;