import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken)
            setToken(token);
    }, [token]);

    const saveToken = (token) => {
        setToken(token);

        localStorage.setItem('token', token);
    }

    const logout = () => {
        setToken(null);
        
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ token, saveToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }