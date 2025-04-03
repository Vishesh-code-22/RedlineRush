import React from "react";

const HomeCard = ({ title, image, content, category }) => {
    const plainTextPreview = content
        .replace(/<[^>]*>/g, "") // Strip HTML tags
        .substring(0, 200); // Truncate
    return (
        <div className="relative w-full h-160 shadow-lg">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white gap-2 pb-16 pl-8">
                    <div
                        className="text-lg bg-white px-2 py-1 font-bold rounded-md w-fit items-center text-black"
                        data-swiper-parallax="-100"
                    >
                        {category}
                    </div>
                    <h2
                        className="text-6xl font-semibold mt-2"
                        data-swiper-parallax="-250"
                    >
                        {title}
                    </h2>
                    <p
                        className="text-lg mt-1 w-1/2"
                        data-swiper-parallax="-500"
                    >
                        {plainTextPreview.length >= 200
                            ? plainTextPreview + "..."
                            : plainTextPreview}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
