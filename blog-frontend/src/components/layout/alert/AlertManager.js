import React, { useContext } from "react";
import './Alert.css';
import { AlertContext } from "context/AlertContext";
import Alert from "./Alert";

const AlertManager = () => {
    const { alerts } = useContext(AlertContext);

    return (
        <div className="alerts-container">
            {alerts.map(({ alert, id }) => <Alert message={alert.message} level={alert.level} key={id} />)}
        </div>
    );
}

export default AlertManager;