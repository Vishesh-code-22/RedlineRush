import React from "react";
import { LoginComp } from "../components";

const Login = () => {
    return (
        <div
            className="flex w-full justify-center items-center"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <LoginComp />
        </div>
    );
};

export default Login;
