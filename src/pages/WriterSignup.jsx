import React from "react";
import { SignupComp } from "../components";

const WriterSignup = () => {
    return (
        <div
            className="flex w-full justify-center items-center"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <SignupComp writerSignup={true} />
        </div>
    );
};

export default WriterSignup;
