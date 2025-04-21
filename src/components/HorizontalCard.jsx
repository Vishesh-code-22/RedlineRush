import React from "react";
import { Link } from "react-router-dom";

const HorizontalCard = ({ id, image, title, content }) => {
    const plainTextPreview = content.replace(/<[^>]*>/g, "").substring(0, 150);

    return (
        <Link
            to={`/blog/${id}`}
            className="flex flex-col lg:flex-row gap-6 items-start p-4 border rounded-lg shadow-md hover:shadow-xl dark:shadow-gray-500 dark:hover:shadow-lg transition-all duration-300 mb-4"
        >
            <img
                src={image}
                alt={title}
                className="w-full h-52 lg:w-48 lg:h-32 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex flex-col">
                <h3 className="text-2xl font-semibold tracking-wide mb-2">
                    {title}
                </h3>
                <p className="text-gray-600">
                    {plainTextPreview.length >= 150
                        ? plainTextPreview + "..."
                        : plainTextPreview}
                </p>
            </div>
        </Link>
    );
};

export default HorizontalCard;
