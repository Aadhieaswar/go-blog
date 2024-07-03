import React, { createContext, useState } from "react";

const NavContext = createContext();

const NavProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState("/");

    return (
        <NavContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavContext.Provider>
    )
}

export { NavContext, NavProvider };