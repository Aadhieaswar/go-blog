import React from "react";

const Alert = ({ message, level }) => {
    return (
        <div className={`toast text-white bg-${level} border-0`} role="alert">
            <div className="toast-body">{ message }</div>
            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
        </div>
    );
}

export default Alert;