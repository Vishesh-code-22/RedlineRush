import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
    const isDarkMode = useSelector((state) => state.utility.isDarkMode);

    return (
        <footer className="w-full border-t border-gray-900 py-6 px-4 mt-auto font-jura dark:border-gray-500">
            <div className="container mx-auto">
                {/* Mobile: Stack layout with more breathing room */}
                <div className="flex flex-col space-y-6 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                    {/* Copyright Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 space-y-2 sm:space-y-0">
                        <div className="flex items-center">
                            <span>© 2025</span>
                            <img
                                src={
                                    isDarkMode
                                        ? "/icons/speedometer-white.png"
                                        : "/icons/speedometer.png"
                                }
                                alt="BlogBase"
                                className="h-5 sm:h-6 mx-2"
                            />
                            <span>RedlineRush</span>
                        </div>
                        <span className="sm:ml-2">All rights reserved</span>
                    </div>

                    {/* Logo Section - Centered on all screens until lg */}
                    <div className="flex items-center justify-center">
                        <img
                            src={
                                isDarkMode
                                    ? "/icons/speedometer-white.png"
                                    : "/icons/speedometer.png"
                            }
                            alt="BlogBase"
                            className="h-8 mr-2"
                        />
                        <span className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-200">
                            RedlineRush
                        </span>
                    </div>

                    {/* Social Icons Section */}
                    <div className="flex items-center justify-center lg:justify-end space-x-6">
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <img
                                src="/icons/twitter.png"
                                alt="Twitter"
                                className="h-5 sm:h-6"
                            />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <img
                                src={
                                    isDarkMode
                                        ? "/icons/github-white.png"
                                        : "/icons/github.png"
                                }
                                alt="GitHub"
                                className="h-5 sm:h-6"
                            />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <img
                                src="/icons/instagram.png"
                                alt="Instagram"
                                className="h-5 sm:h-6"
                            />
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <img
                                src="/icons/linkedin.png"
                                alt="LinkedIn"
                                className="h-5 sm:h-6"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
