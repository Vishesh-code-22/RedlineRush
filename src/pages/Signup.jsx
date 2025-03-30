import React from "react";
import { SignupComp } from "../components";

const Signup = () => {
    return (
        <div
            className="flex w-full justify-center items-center"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <SignupComp />
        </div>
    );
};

export default Signup;
