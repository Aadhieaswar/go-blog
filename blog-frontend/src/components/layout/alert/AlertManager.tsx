import React from "react";
import './Alert.css';
import { Alert } from "react-bootstrap";
import { useAlerts, AlertState } from "@context/AlertContext";

const AlertManager: React.FC = () => {
    const { alerts } = useAlerts();

    return (
        <div className="alerts-container">
            {alerts.map(({ alert, id }: AlertState) => (
                <Alert
                    key={id}
                    variant={alert.level}
                    className="alert-card"
                    >
                    {alert.message}
                </Alert>
                )
            )}
        </div>
    );
}

export default AlertManager;