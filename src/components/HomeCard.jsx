import React from "react";

const HomeCard = ({ title, image, description }) => {
    return (
        <div className="flex flex-col w-full font-jura gap-2">
            <div className="image relative">
                <img
                    src={image}
                    alt=""
                    className="w-full object-cover h-130 rounded"
                />
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-70 text-black px-3 py-1 rounded-md text-sm font-medium">
                    Category
                </div>
            </div>
            <h2 className="title text-4xl tracking-wider font-semibold">
                {title}
            </h2>
            <p className="content text-2xl font-medium text-gray-500">
                {description.substring(0, 300) + "..."}
            </p>
        </div>
    );
};

export default HomeCard;
