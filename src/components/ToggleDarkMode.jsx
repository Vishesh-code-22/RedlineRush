import React from "react";
import useDarkMode from "../hooks/useDarkMode";

const ToggleDarkMode = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div
            onClick={toggleDarkMode}
            className={`relative w-8 h-8 xl:w-10 xl:h-10 transition-all rounded-full overflow-hidden cursor-pointer duration-300 
                        ${darkMode ? "bg-gray-950" : "bg-white"}`}
        >
            <div
                className="absolute top-0 left-0 w-full h-[200%] transition-transform duration-500 ease-in-out"
                style={{
                    transform: darkMode ? "translateY(-50%)" : "translateY(0%)",
                }}
            >
                {/* Day Icon */}
                <div className="w-full h-8 xl:h-10 flex items-center justify-center">
                    <img
                        src="/icons/day.png"
                        alt="Light mode"
                        className="w-4 h-4 xl:w-6 xl:h-6 object-contain"
                    />
                </div>

                {/* Night Icon */}
                <div className="w-full h-8 xl:h-10 flex items-center justify-center">
                    <img
                        src="/icons/night.png"
                        alt="Dark mode"
                        className="w-4 h-4 xl:w-6 xl:h-6 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default ToggleDarkMode;
