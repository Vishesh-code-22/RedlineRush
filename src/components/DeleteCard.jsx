import React from "react";
import { Link } from "react-router-dom";
const DeleteCard = ({ id, image, title, content, handleDelete }) => {
    const plainTextPreview = content
        .replace(/<[^>]*>/g, "") // Strip HTML tags
        .substring(0, 200); // Truncate
    return (
        <div
            className="flex flex-col hover:shadow-2xl duration-300 transition-all ease-in-out rounded hover:scale-101 relative cursor-pointer"
            onClick={() => handleDelete(id)}
        >
            <div className="opacity-0 w-full h-full absolute flex justify-center items-center hover:opacity-100 duration-300 hover:bg-red-600/50 rounded">
                <img src="/icons/x-mark.png" alt="" className="h-24" />
            </div>
            <img
                src={image}
                alt=""
                className="w-full object-cover h-64 rounded"
            />
            <h3 className="title text-2xl tracking-wider font-semibold">
                {title}
            </h3>
            <p className="content font-medium text-gray-500 pb-4">
                {plainTextPreview.length >= 200
                    ? plainTextPreview + "..."
                    : plainTextPreview}
            </p>
        </div>
    );
};

export default DeleteCard;
