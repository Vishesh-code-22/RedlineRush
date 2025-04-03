import React from "react";
import { Link } from "react-router-dom";
const Card = ({ id, image, title, content }) => {
    const plainTextPreview = content
        .replace(/<[^>]*>/g, "") // Strip HTML tags
        .substring(0, 200); // Truncate
    return (
        <Link
            to={`/blog/${id}`}
            className="flex flex-col hover:shadow-2xl duration-300 transition-all ease-in-out rounded hover:scale-101"
        >
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
        </Link>
    );
};

export default Card;
