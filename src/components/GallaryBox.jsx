import React from "react";

const GallaryBox = () => {
    const images = [
        {
            owner: "@theanurags",
            src: "/images/gt650.jpg",
            size: "col-span-2 row-span-2",
        },
        {
            owner: "@fronxcarclub",
            src: "/images/fronx.jpg",
            size: "row-span-1",
        },
        {
            owner: "@al_evox87",
            src: "/images/civic.jpg",
            size: "col-span-1 row-span-2",
        },
        {
            owner: "@doc_with_helmet",
            src: "/images/bmw.jpg",
            size: "row-span-1",
        },
        {
            owner: "@tinydanzarides",
            src: "/images/scrambler.jpg",
            size: "col-span-1",
        },
        {
            owner: "@mercedesbenzgclass",
            src: "/images/gwagon.jpg",
            size: "col-span-2 row-span-1",
        },
        {
            owner: "@hondaracingindia",
            src: "/images/honda.jpg",
            size: "col-span-1",
        },
    ];

    return (
        <div className="w-full flex flex-col items-center py-10">
            {/* Title Section */}
            <div className="title-container">
                <h2 className="title-main">Gallery</h2>
                <p className="subtitle-main">Check out our gallery</p>
            </div>

            {/* Bento Grid Layout - No Empty Spaces */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-screen-xl px-4 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px] grid-auto-flow-dense">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden group ${image.size}`}
                    >
                        {/* Image with Scale Hover */}
                        <img
                            src={image.src}
                            alt={image.owner}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Overlay for Owner Name */}
                        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {image.owner}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GallaryBox;
