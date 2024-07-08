import { ReactNode } from "react";
import { AuthProvider } from "@context/AuthContext";
import { AlertProvider } from "@context/AlertContext";
// import { NavProvider } from "./NavContext";

type ComponentWithChildren = ({ children }: { children: ReactNode }) => JSX.Element;

const providers: ComponentWithChildren[] = [
    AuthProvider as ComponentWithChildren,
    AlertProvider as ComponentWithChildren,
    // NavProvider,
];

const combineComponents = (...components: ComponentWithChildren[]): ComponentWithChildren => {
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