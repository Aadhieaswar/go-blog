import { NavContext } from "context/NavContext";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteHandler = () => {
    const { setCurrentPage } = useContext(NavContext);
    const location = useLocation();

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location, setCurrentPage]);

    return null;
}

export default RouteHandler;