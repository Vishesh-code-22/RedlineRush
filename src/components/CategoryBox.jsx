import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ image, title, subtitle }) => {
    return (
        <Link
            to={`/category/${title}`}
            className="relative h-40 sm:h-48 md:h-52 lg:h-64 xl:h-160 w-full rounded-xl sm:rounded-2xl overflow-hidden"
        >
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                {/* Background Image with Hover Effect */}
                <div className="absolute inset-0 w-full h-full transition-transform duration-300 hover:scale-110">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Text Content - Stays Static */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white pointer-events-none p-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-center">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-1 sm:mt-2 text-center">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

const CategoryBox = () => {
    const categories = [
        {
            image: "https://i.ytimg.com/vi/qqluwrhQZkA/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDUALYaOoVlkdoOjiQVFpJYAcIJpQ",
            title: "Reviews",
            subtitle: "",
        },
        {
            image: "https://images.unsplash.com/photo-1650569663281-44a28c984e2a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Guides",
            subtitle: "",
        },
        {
            image: "https://images.unsplash.com/photo-1508710824712-56209dc94b2c?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Stories",
            subtitle: "",
        },
        {
            image: "https://images.unsplash.com/photo-1574988057523-8fecfbc3ad43?q=80&w=2702&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Travel",
            subtitle: "",
        },
    ];

    return (
        <div className="flex flex-col w-full">
            <div className="title-container">
                <h2 className="title-main">Categories</h2>
                <p className="subtitle-main">Explore everything</p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((item, index) => (
                    <CategoryItem
                        key={index}
                        image={item.image}
                        title={item.title}
                        subtitle={item.subtitle}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryBox;
