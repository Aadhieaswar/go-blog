import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface AuthContextType {
    token: string | null;
    saveToken: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const tokenKey: string = 'token';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedToken = localStorage.getItem(tokenKey);

        if (storedToken)
            setToken(storedToken);

        setLoading(false)
    });

    const saveToken = (token: string) => {
        setToken(token);

        localStorage.setItem(tokenKey, token);
    }

    const logout = () => {
        setToken(null);
        
        localStorage.removeItem(tokenKey);
    }

    return (
        <AuthContext.Provider value={{ token, saveToken, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
