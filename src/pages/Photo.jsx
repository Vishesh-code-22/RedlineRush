import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Photo = () => {
    const { id } = useParams();
    const imageData = useSelector((state) => state.other.galleryData);

    const image = imageData.find((image) => image.id === id);
    return (
        <div className="main flex flex-col w-full font-jura">
            <div className="main-content flex flex-col w-full sm:gap-4 sm:my-4 sm:px-16 lg:gap-8 lg:my-8 lg:px-32 items-center transition-all duration-200">
                <div className="top flex flex-col w-full items-center">
                    <h2 className="transition-all duration-200 title text-2xl pt-2 sm:pt-0 sm:text-3xl lg:text-5xl font-semibold tracking-wider text-center pb-4 text-gray-800 dark:text-gray-300">
                        Posted by{" "}
                        <span className="transition-all duration-200 text-2xl sm:text-3xl lg:text-5xl font-bold text-black dark:text-gray-100">
                            {image.owner}
                        </span>
                    </h2>
                </div>
                <div className="featured-image w-full sm:w-auto">
                    <img
                        src={image.imageUrl}
                        alt=""
                        className="w-full sm:w-auto h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Photo;
