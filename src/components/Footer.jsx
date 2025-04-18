import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
    const isDarkMode = useSelector((state) => state.utility.isDarkMode);

    return (
        <footer className="w-full border-t border-gray-900 py-6 px-4 mt-auto font-jura dark:border-gray-500">
            <div className="container mx-auto grid grid-cols-3 items-center">
                <div className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                    <span>© 2025</span>
                    <img
                        src={
                            isDarkMode
                                ? "/icons/speedometer-white.png"
                                : "/icons/speedometer.png"
                        }
                        alt="BlogBase"
                        className="h-6 mx-2"
                    />
                    <span>RedlineRush All rights reserved</span>
                </div>

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
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                        RedlineRush
                    </span>
                </div>

                <div className="flex items-center justify-end space-x-4">
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <img
                            src="/icons/twitter.png"
                            alt="Twitter"
                            className="h-5"
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
                            className="h-5"
                        />
                    </a>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <img
                            src="/icons/instagram.png"
                            alt="Instagram"
                            className="h-5"
                        />
                    </a>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <img
                            src="/icons/linkedin.png"
                            alt="LinkedIn"
                            className="h-5"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
