import React from "react";

const GallaryBox = () => {
    const images = [
        {
            owner: "@theanurags",
            src: "/images/gt650.jpg",
        },
        {
            owner: "@fronxcarclub",
            src: "/images/fronx.jpg",
        },
        {
            owner: "@al_evox87",
            src: "/images/civic.jpg",
        },
        {
            owner: "@doc_with_helmet",
            src: "/images/bmw.jpg",
        },
        {
            owner: "@tinydanzarides",
            src: "/images/scrambler.jpg",
        },
        {
            owner: "@mercedesbenzgclass",
            src: "/images/gwagon.jpg",
        },
    ];
    return (
        <div className="flex flex-col w-full font-jura relative mb-0">
            <div className="relative w-full pb-2 z-10 text-center">
                <h2 className="text-6xl font-semibold tracking-wider text-black pb-2">
                    Gallary
                </h2>
                <p className="text-2xl font-semibold text-gray-400 mb-6">
                    Check out our gallary
                </p>
            </div>
            <div className="grid grid-cols-2 w-full">
                {images.map((image, index) => (
                    <div key={index} className="overflow-hidden shadow-lg">
                        <img
                            src={image.src}
                            alt={image.owner}
                            className="w-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GallaryBox;
