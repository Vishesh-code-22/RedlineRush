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
            <div className="relative w-full h-160 flex justify-center items-center overflow-hidden rounded-xl">
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
                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-12 z-10">
                    {[
                        { icon: "/icons/forum.png", title: "Forum" },
                        { icon: "/icons/trips.png", title: "Rides" },
                        { icon: "/icons/submit.png", title: "Submit" },
                        { icon: "/icons/merch.png", title: "Merch" },
                    ].map((item, index) => (
                        <Link
                            to={item.title === "Submit" ? "/submit" : "#"}
                            key={index}
                            className="flex flex-col justify-center h-60 w-80 items-center p-4 bg-white/10 rounded-lg transition-transform duration-300 hover:scale-110"
                        >
                            <img
                                src={item.icon}
                                alt={item.title}
                                className="w-30 h-30 mb-2"
                            />
                            <p className="text-2xl font-bold text-white">
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
