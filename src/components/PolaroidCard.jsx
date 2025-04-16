import React from "react";
import { Link } from "react-router-dom";

const PolaroidCard = ({ image }) => {
    return (
        <Link
            className="flex flex-col bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 rounded-sm max-w-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            to={`/photo/${image.id}`}
        >
            {/* Image Container */}
            <div className="p-3 pb-0">
                <div className="overflow-hidden bg-gray-100">
                    <img
                        src={image.imageUrl}
                        alt={image.owner}
                        className="w-full h-80 object-cover"
                    />
                </div>
            </div>

            {/* Caption Area */}
            <div className="p-4 text-center">
                <p className="text-gray-700 dark:text-gray-200 font-medium">
                    {image.owner}
                </p>
            </div>
        </Link>
    );
};

export default PolaroidCard;
