import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GallaryBox = () => {
    const imageData = useSelector((state) => state.other.galleryData);
    let images = [
        {
            size: "col-span-2 row-span-2",
        },
        {
            size: "row-span-1",
        },
        {
            size: "col-span-1 row-span-2",
        },
        {
            size: "row-span-1",
        },
        {
            size: "col-span-1",
        },
        {
            size: "col-span-2 row-span-1",
        },
        {
            size: "col-span-1",
        },
    ];

    images = images.map((image, index) => ({
        ...image,
        ...imageData[index],
    }));

    return (
        <div className="w-full flex flex-col items-center py-10">
            {/* Title Section */}
            <div className="title-container">
                <Link
                    to="/gallery"
                    className="title-main hover:-translate-y-1 duration-200"
                >
                    Gallery
                </Link>
                <p className="subtitle-main">Check out our gallery</p>
            </div>

            {/* Bento Grid Layout - No Empty Spaces */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-screen-xl px-4 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px] grid-auto-flow-dense">
                {images.map((image, index) => (
                    <Link
                        to={`/photo/${image.id}`}
                        key={index}
                        className={`relative overflow-hidden group ${image.size}`}
                    >
                        {/* Image with Scale Hover */}
                        <img
                            src={image.imageUrl}
                            alt={image.owner}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Overlay for Owner Name */}
                        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {image.owner}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GallaryBox;
