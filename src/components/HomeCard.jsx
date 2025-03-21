import React, { useState } from "react";

const HomeCard = ({ title, image }) => {
    const [content, setContent] =
        useState(`The Triumph Daytona 675R is one of the most iconic supersport
        motorcycles ever built. With its aggressive styling, precision
        handling, and exhilarating power delivery, it has earned a cult
        following among riders and enthusiasts. Whether carving through
        mountain roads, dominating track days, or simply turning heads
        with its sleek British design, the Daytona 675R stands as a
        masterpiece of engineering. In this blog, we'll explore what
        makes the Daytona 675R special, from its performance to its
        legacy in the motorcycle world.Triumph first introduced the
        Daytona 675 in 2006, breaking away from the traditional 600cc
        four-cylinder configuration seen in Japanese competitors like
        the Yamaha R6 and Honda CBR600RR. Instead, Triumph opted for a
        675cc inline-three engine, offering a perfect blend of
        high-revving power and strong mid-range torque. The 675R
        variant, introduced in 2011, took the Daytona 675 to the next
        level with premium suspension, brakes, and lightweight
        components, making it an even more track-focused beast.`);
    return (
        <div className="flex flex-col w-full font-jura gap-2">
            <div className="image relative">
                <img
                    src={image}
                    alt=""
                    className="w-full object-cover h-130 rounded"
                />
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-70 text-black px-3 py-1 rounded-md text-sm font-medium">
                    Category
                </div>
            </div>
            <h2 className="title text-4xl tracking-wider font-semibold">
                {title}
            </h2>
            <p className="content text-2xl font-medium text-gray-500">
                {content.substring(0, 250) + "..."}
            </p>
        </div>
    );
};

export default HomeCard;
