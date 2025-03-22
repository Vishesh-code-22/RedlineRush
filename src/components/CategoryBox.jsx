import React from "react";

const CategoryItem = ({ image, title, subtitle }) => {
    return (
        <div>
            <div className="pb-3">
                <img
                    src={image}
                    alt={title}
                    className="w-full object-cover aspect-[4/3] rounded"
                />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            {subtitle && (
                <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
            )}
        </div>
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
        <div className="w-full font-jura px-8 pb-6">
            <div className="mb-6">
                <h2 className="text-6xl font-semibold tracking-wider font-jura">
                    Categories
                </h2>
                <p className="text-2xl font-semibold text-gray-400">
                    Explore everything
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
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
