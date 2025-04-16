import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Photo = () => {
    const { id } = useParams();
    const imageData = useSelector((state) => state.other.galleryData);

    const image = imageData.find((image) => image.id === id);
    return (
        <div className="main flex flex-col w-full font-jura">
            <div className="main-content flex flex-col w-full gap-8 my-8 px-32 items-center">
                <div className="top flex flex-col w-full items-center">
                    <h2 className="title text-5xl font-semibold tracking-wider text-center pb-4 text-gray-800">
                        Posted by{" "}
                        <span className="text-5xl font-bold text-black">
                            {image.owner}
                        </span>
                    </h2>
                </div>
                <div className="featured-image">
                    <img src={image.imageUrl} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Photo;
