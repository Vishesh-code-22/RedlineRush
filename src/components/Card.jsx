import React from "react";
import { Link } from "react-router-dom";
const Card = ({ id, image, title, content, edit = false }) => {
    const plainTextPreview = content
        .replace(/<[^>]*>/g, "") // Strip HTML tags
        .substring(0, 200); // Truncate
    return (
        <Link
            to={edit ? `/edit-this-blog/${id}` : `/blog/${id}`}
            className="flex flex-col hover:shadow-2xl duration-300 transition-all ease-in-out rounded hover:scale-101"
        >
            <img
                src={image}
                alt=""
                className="w-full object-cover h-64 rounded"
            />
            <h3 className="title text-xl lg:text-2xl tracking-wider font-semibold duration-300 transition-all">
                {title}
            </h3>
            <p className="content font-light text-sm lg:font-normal lg:text-base text-gray-500 pb-4 duration-300 transition-all">
                {plainTextPreview.length >= 200
                    ? plainTextPreview + "..."
                    : plainTextPreview}
            </p>
        </Link>
    );
};

export default Card;
