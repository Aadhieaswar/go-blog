import React, { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, level, duration = 3000) => {
        const newAlert = {
            alert: { message, level },
            id: Date.now(),
        }

        // store only the last 3 alerts
        if (message) {
            setAlerts(a => [...a, newAlert].slice(-3));
        
            setTimeout(() => {
                removeAlert(newAlert.id);
            }, duration);
        }
    };

    const removeAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    }

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    )
}

export { AlertContext, AlertProvider };