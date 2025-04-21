import React from "react";

const HomeCard = ({ title, image, content, category }) => {
    const plainTextPreview = content
        .replace(/<[^>]*>/g, "") // Strip HTML tags
        .substring(0, 200); // Truncate
    return (
        <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-96 xl:h-[32rem] 2xl:h-[36rem] shadow-lg">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center lg:justify-end lg:items-start p-4 sm:p-6 lg:pb-8 lg:pl-10 xl:pb-12 xl:pl-14 2xl:pb-16 2xl:pl-16 text-white gap-1 sm:gap-2 lg:gap-3">
                    {/* Category badge - hidden on smallest screens, centered on medium */}
                    <div
                        className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg bg-white px-2 py-0.5 sm:px-3 sm:py-1 font-bold rounded-md text-black"
                        data-swiper-parallax="-100"
                    >
                        {category}
                    </div>

                    {/* Title - responsive text sizes and alignment */}
                    <h2
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold text-center lg:text-left w-full"
                        data-swiper-parallax="-250"
                    >
                        {title}
                    </h2>

                    {/* Content preview - responsive width and visibility */}
                    <p
                        className="hidden sm:block text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center lg:text-left"
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
