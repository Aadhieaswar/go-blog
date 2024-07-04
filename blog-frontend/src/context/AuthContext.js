import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken)
            setToken(storedToken);

        setLoading(false)
    });

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
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };