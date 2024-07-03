import React from "react";
import { AuthProvider } from "context/AuthContext";
import { NavProvider } from "./NavContext";
import { AlertProvider } from "./AlertContext";

const providers = [
    AuthProvider,
    NavProvider,
    AlertProvider
];

const combineComponents = (...components) => {
    return components.reduce((CombinedComponents, CurrentComponent) => {
        return ({ children }) => {
            return (
                <CombinedComponents>
                    <CurrentComponent>
                        {children}
                    </CurrentComponent>
                </CombinedComponents>
            );
        }
    }, ({ children }) => <>{children}</>);
}

const AppContextProvider = combineComponents(...providers);


export default AppContextProvider;