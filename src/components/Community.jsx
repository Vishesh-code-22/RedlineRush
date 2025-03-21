import React from "react";

const CommunitySection = ({ title, imageSrc, description }) => {
    return (
        <div className="relative h-48 md:h-64 overflow-hidden group mb-4">
            {/* Background Image */}
            <img
                src={imageSrc}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl md:text-3xl font-bold">
                    {title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base mt-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {description}
                </p>
            </div>
        </div>
    );
};

const Community = () => {
    const sections = [
        {
            title: "Forums",
            imageSrc: "/icons/forum.png",
            description:
                "Join discussions with fellow enthusiasts and share your experiences.",
        },
        {
            title: "Rides",
            imageSrc: "/icons/rides.png",
            description:
                "Discover group rides and events happening in your area.",
        },
        {
            title: "Submit",
            imageSrc: "/icons/submit.png",
            description:
                "Share your stories, photos, and videos with our community.",
        },
        {
            title: "Merch",
            imageSrc: "/icons/merch.png",
            description:
                "Exclusive apparel and accessories for true enthusiasts.",
        },
    ];

    return (
        <div className="w-full relative overflow-hidden font-jura">
            {/* Background Video for entire component */}
            <video
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/videos/community-bg.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for better content visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Content Container */}
            <div className="relative z-10 p-6 md:p-8">
                <div className="mb-6">
                    <h2 className="text-4xl font-bold text-white">Community</h2>
                    <p className="text-xl text-gray-300">
                        Connect with fellow enthusiasts
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.map((section, index) => (
                        <CommunitySection
                            key={index}
                            title={section.title}
                            imageSrc={section.imageSrc}
                            description={section.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Community;
