import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Title Section - At the Top */}
            <div className="title-container">
                <h2 className="title-main">Community</h2>
                <p className="subtitle-main">Connect with the community</p>
            </div>

            {/* Video Container with Boxes Inside */}
            <div className="relative w-full h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem] xl:h-160 2xl:h-[44rem] flex justify-center items-center overflow-hidden rounded-xl">
                {/* Background Video */}
                <video
                    preload="none"
                    muted
                    autoPlay
                    loop
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/community-vid.mp4" type="video/mp4" />
                </video>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Grid Boxes Inside Video */}
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 z-10 p-4">
                    {[
                        { icon: "/icons/forum.png", title: "Forum" },
                        { icon: "/icons/trips.png", title: "Rides" },
                        { icon: "/icons/submit.png", title: "Submit" },
                        { icon: "/icons/merch.png", title: "Merch" },
                    ].map((item, index) => (
                        <Link
                            to={`/${item.title.toLowerCase()}`}
                            key={index}
                            className="flex flex-col justify-center items-center p-3 sm:p-4 bg-white/10 rounded-lg transition-transform duration-300 hover:scale-110 w-36 sm:w-40 md:w-40 lg:w-56 xl:w-80 h-40 sm:h-42 md:h-44 lg:h-52 xl:h-60"
                        >
                            <img
                                src={item.icon}
                                alt={item.title}
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-12 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-30 2xl:h-30 mb-2 object-contain"
                            />
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white text-center">
                                {item.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Community;
