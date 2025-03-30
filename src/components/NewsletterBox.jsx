import React from "react";

const NewsletterBox = () => {
    return (
        <div className="relative flex flex-col justify-center w-full h-160 p-8 text-center rounded-2xl bg-gradient-to-br from-gray-900 to-red-950 shadow-xl border border-gray-800 mb-12">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/api/placeholder/400/400')] bg-cover bg-center rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-center w-full">
                <h2 className="text-4xl font-bold tracking-wider text-white mb-2 md:text-6xl">
                    NEWSLETTER
                </h2>

                <div className="w-32 h-1 mx-auto mb-6 bg-gradient-to-r from-red-500 to-rose-600"></div>

                <p className="text-2xl text-gray-300 mb-8 max-w-lg mx-auto">
                    Subscribe for the latest reviews, builds, and event
                    announcements.
                </p>

                <form className="w-full max-w-xl flex flex-col">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2 w-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full py-3 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                            required
                        />
                        <button
                            type="submit"
                            className="py-3 px-6 bg-gradient-to-r from-red-500 to-rose-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 md:whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </div>

                    <p className="mt-4 text-xs text-gray-500">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </form>
            </div>

            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-rose-500 to-transparent opacity-20 rounded-full blur-2xl -mr-10 -mb-10"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-500 to-transparent opacity-20 rounded-full blur-2xl -ml-10 -mt-10"></div>
        </div>
    );
};

export default NewsletterBox;
