import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true, roleAuthor = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && status !== authentication && !roleAuthor) {
            navigate("/login");
        } else if (authentication && status !== authentication && roleAuthor) {
            navigate("/writer-login");
        }
        setLoader(false);
    }, [status, authentication, navigate, roleAuthor]);
    return loader ? (
        <div className="flex items-center justify-center min-h-screen caret-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    ) : (
        <>{children}</>
    );
};

export default AuthLayout;
