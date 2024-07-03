import React from "react";
import './Alert.css';

const Alert = ({ message, level, onClose }) => {

    return (
        <div className={`alert-card card border-${level ?? 'primary'}`}>
            <p className={`card-text text-${level ?? 'primary'}`}>{message}</p>
        </div>
    );
}

export default Alert;