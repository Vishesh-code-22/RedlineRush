import React from "react";
import { AddAvatarComp } from "../components";
import { useParams } from "react-router-dom";

const AddAvatar = () => {
    const { id } = useParams();
    return (
        <div
            className="flex w-full justify-center items-center"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <AddAvatarComp id={id} />
        </div>
    );
};

export default AddAvatar;
