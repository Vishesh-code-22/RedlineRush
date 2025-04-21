import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GallaryBox = () => {
    const imageData = useSelector((state) => state.other.galleryData);

    // Responsive image sizes
    let images = [
        {
            size: "col-span-2 row-span-2",
            mobileSizeClass:
                "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
        },
        {
            size: "row-span-1",
            mobileSizeClass:
                "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
        },
        {
            size: "col-span-1 row-span-2",
            mobileSizeClass:
                "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
        },
        {
            size: "row-span-1",
            mobileSizeClass:
                "col-span-2 row-span-1 md:col-span-1 md:row-span-1",
        },
        {
            size: "col-span-1",
            mobileSizeClass:
                "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
        },
        {
            size: "col-span-2 row-span-1",
            mobileSizeClass:
                "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
        },
        {
            size: "col-span-1",
            mobileSizeClass:
                "col-span-2 row-span-1 md:col-span-1 md:row-span-1",
        },
    ];

    images = images.map((image, index) => ({
        ...image,
        ...imageData[index],
    }));

    return (
        <div className="w-full flex flex-col items-center py-6 sm:py-8 md:py-10">
            {/* Title Section */}
            <div className="title-container mb-4 sm:mb-6 lg:mb-8">
                <Link
                    to="/gallery"
                    className="title-main hover:-translate-y-1 duration-200 text-2xl sm:text-3xl md:text-4xl xl:text-5xl"
                >
                    Gallery
                </Link>
                <p className="subtitle-main text-sm sm:text-base md:text-lg">
                    Check out our gallery
                </p>
            </div>

            {/* Bento Grid Layout - No Empty Spaces */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full max-w-screen-xl px-2 sm:px-4 auto-rows-[120px] sm:auto-rows-[160px] md:auto-rows-[200px] lg:auto-rows-[240px] xl:auto-rows-[280px] 2xl:auto-rows-[300px] grid-auto-flow-dense">
                {images.map((image, index) => (
                    <Link
                        to={`/photo/${image.id}`}
                        key={index}
                        className={`relative overflow-hidden group rounded-lg ${
                            image.mobileSizeClass || image.size
                        }`}
                    >
                        {/* Image with Scale Hover */}
                        <img
                            src={image.imageUrl}
                            alt={image.owner}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Overlay for Owner Name */}
                        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center p-1 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs sm:text-sm md:text-base">
                            {image.owner}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GallaryBox;
