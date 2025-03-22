import React from "react";

const Community = () => {
    return (
        <div className="flex flex-col w-full font-jura relative p-8 pb-26">
            {/* Background Video */}
            <video
                preload="none"
                muted
                autoPlay
                loop
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/videos/community-vid.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>

            {/* Title Section */}
            <div className="relative w-full pb-2 z-10 text-center">
                <h2 className="text-6xl font-semibold tracking-wider text-white pb-2">
                    Community
                </h2>
                <p className="text-2xl font-semibold text-white/80 mb-6">
                    Connect with the community
                </p>
            </div>

            {/* Grid Section */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 z-10 mx-auto">
                <div className="forums flex flex-col items-center w-80 bg-white/20 backdrop-blur-sm rounded-2xl py-6 shadow-lg transition-all hover:scale-105 hover:bg-white/30">
                    <img
                        src="/icons/forum.png"
                        alt="Forum"
                        className="h-30 w-30 mb-2"
                    />
                    <p className="text-xl font-bold text-white">Forum</p>
                </div>
                <div className="rides flex flex-col items-center w-80 bg-white/20 backdrop-blur-sm rounded-2xl py-6 shadow-lg transition-all hover:scale-105 hover:bg-white/30">
                    <img
                        src="/icons/trips.png"
                        alt="Rides"
                        className="h-30 w-30 mb-2"
                    />
                    <p className="text-xl font-bold text-white">Rides</p>
                </div>
                <div className="submit flex flex-col items-center w-80 bg-white/20 backdrop-blur-sm rounded-2xl py-6 shadow-lg transition-all hover:scale-105 hover:bg-white/30">
                    <img
                        src="/icons/submit.png"
                        alt="Submit"
                        className="h-30 w-30 mb-2"
                    />
                    <p className="text-xl font-bold text-white">Submit</p>
                </div>
                <div className="merch flex flex-col items-center w-80 bg-white/20 backdrop-blur-sm rounded-2xl py-6 shadow-lg transition-all hover:scale-105 hover:bg-white/30">
                    <img
                        src="/icons/merch.png"
                        alt="Merch"
                        className="h-30 w-30 mb-2"
                    />
                    <p className="text-xl font-bold text-white">Merch</p>
                </div>
            </div>
        </div>
    );
};

export default Community;
