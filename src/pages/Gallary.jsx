import React from "react";
import { PolaroidCard } from "../components";
import { useSelector } from "react-redux";

const Gallery = () => {
    const imageData = useSelector((state) => state.other.galleryData);

    return (
        <div className="w-full bg-gray-50 py-16 font-jura">
            {/* Gallery Header */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="title-main mb-3">Gallery</h2>
                <p className="text-xl text-gray-600">
                    Check out our collection of amazing vehicles
                </p>
            </div>

            {/* Polaroid Grid - 4 cards per row */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {imageData.map((image, index) => (
                        <PolaroidCard key={index} image={image} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
