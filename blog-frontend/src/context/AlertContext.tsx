import React, { createContext, ReactNode, useContext, useState } from "react";

export type Alert = {
    message: string;
    level: string;
};

export type AlertState = {
    alert: Alert;
    id: number;
};

interface AlertContextType {
    alerts: AlertState[],
    addAlert: (message: string, level: string, duration?: number) => void;
    removeAlert: (id: number) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alerts, setAlerts] = useState<AlertState[]>([]);

    const addAlert = (message: string, level: string, duration = 3000) => {
        const newAlert: AlertState = {
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

    const removeAlert = (id: number) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    }

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlerts = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlerts must be used within an AlertProvider');
    }
    return context;
};
