import React from "react";

const NewsletterBox = () => {
    return (
        <div
            className="flex flex-col w-full font-jura relative p-8 pb-26 justify-center text-center bg-gray-950"
            style={{ height: "calc(100vh - 3rem)" }}
        >
            <h2 className="text-6xl font-semibold tracking-wider text-white pb-2">
                Newsletter
            </h2>
            <p className="text-2xl font-semibold text-gray-400 mb-6">
                Subscribe for the latest reviews, builds, and event
                announcements.
            </p>
            <form action="/newsletter" className="p-8">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 mb-4 rounded-md border border-gray-200  bg-white"
                />
                <button
                    type="submit"
                    className="bg-white cursor-pointer text-black px-8 py-2 rounded-md hover:scale-105 hover:font-bold duration-150 transition-all ease-in-out"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsletterBox;
