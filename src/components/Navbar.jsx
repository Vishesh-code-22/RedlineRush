import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/authService";
import { logout } from "../store/authSlice";
import { setIsLoading } from "../store/utilitySlice";
import dataService from "../appwrite/dataService";
import { ToggleDarkMode } from "./";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    // Take status, role and userdata from store
    // Conditionally show different navbars
    const { status, role, userData, avatar } = useSelector(
        (state) => state.auth
    );
    const isDarkMode = useSelector((state) => state.utility.isDarkMode);

    const { showNav } = useSelector((state) => state.utility);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const scrollRef = useRef();
    const categoryDropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const toggleDropdown = (setter) => {
        if (setter === setCategoryDropdownOpen) {
            setProfileDropdownOpen(false);
        } else if (setter === setProfileDropdownOpen) {
            setCategoryDropdownOpen(false);
        }

        setter((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(setIsLoading(true));
        authService.logout().then(() => {
            dispatch(logout());
            dispatch(setIsLoading(false));
            navigate("/");
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                categoryDropdownRef.current &&
                !categoryDropdownRef.current.contains(event.target) &&
                categoryDropdownOpen
            ) {
                setCategoryDropdownOpen(false);
            }
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target) &&
                profileDropdownOpen
            ) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [categoryDropdownOpen, profileDropdownOpen]);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "+=100",
            onEnter: () => {
                gsap.to(scrollRef.current, {
                    height: "3rem",
                    duration: 0.3,
                });
            },
            onLeaveBack: () => {
                gsap.to(scrollRef.current, {
                    height: "5.5rem",
                    duration: 0.3,
                });
            },
        });
    }, []);

    // Animation for mobile menu
    useEffect(() => {
        if (mobileMenuRef.current) {
            if (isOpen) {
                // Open animation
                gsap.to(mobileMenuRef.current, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });
            } else {
                // Close animation
                gsap.to(mobileMenuRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                });
            }
        }
    }, [isOpen]);

    // Render login button if status is explicitly false, otherwise show loading
    const renderAuthSection = () => {
        if (status === false) {
            return (
                <Link
                    to={"/login"}
                    className="md:px-2 lg:px-4 xl:px-6 py-1 md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-white bg-black rounded-md hover:bg-gray-800 dark:bg-gray-200 dark:text-black dark:hover:bg-white"
                >
                    Login
                </Link>
            );
        } else if (status === true && userData) {
            return (
                <div className="relative ml-3" ref={profileDropdownRef}>
                    <button
                        onClick={() => toggleDropdown(setProfileDropdownOpen)}
                        className="flex text-xl rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <span className="sr-only">Open user menu</span>
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50 shadow-sm">
                            <img
                                src={dataService.getUserImagePreview(avatar)}
                                alt="User avatar"
                                className="h-full w-full object-center object-cover"
                            />
                        </div>
                    </button>

                    {profileDropdownOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                                {role !== "author" ? (
                                    <>
                                        <Link
                                            to="/history"
                                            className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            History
                                        </Link>
                                        <a
                                            href="#read-list"
                                            className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            Read List
                                        </a>
                                    </>
                                ) : (
                                    <Link
                                        to="/your-blogs"
                                        className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                                        onClick={() =>
                                            setProfileDropdownOpen(false)
                                        }
                                    >
                                        Your Blogs
                                    </Link>
                                )}
                                <div
                                    className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setProfileDropdownOpen(false);
                                        handleLogout();
                                    }}
                                >
                                    Logout
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        } else {
            // Loading state
            return (
                <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            );
        }
    };

    // Render mobile auth section
    const renderMobileAuthSection = () => {
        if (status === false) {
            return (
                <Link
                    to={"/login"}
                    className="mt-3 block w-11/12 mx-auto px-4 py-3 text-center text-base font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-200 dark:bg-gray-200 dark:text-black dark:hover:bg-white"
                >
                    Login
                </Link>
            );
        } else if (status === true && userData) {
            return (
                <div className="mt-6 space-y-3" ref={profileDropdownRef}>
                    <div className="px-4 py-3 flex items-center justify-center">
                        <div className="mr-3 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
                            {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-lg font-medium">
                            {userData.name}
                        </span>
                    </div>

                    {role !== "author" ? (
                        <>
                            <Link
                                to="/history"
                                className="block w-11/12 mx-auto px-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                History
                            </Link>
                            <a
                                href="#read-list"
                                className="block w-11/12 mx-auto px-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Read List
                            </a>
                        </>
                    ) : (
                        <Link
                            to="/your-blogs"
                            className="block w-11/12 mx-auto px-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Your Blogs
                        </Link>
                    )}
                    <button
                        className="block w-11/12 mx-auto px-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            );
        } else {
            // Loading state
            return (
                <div className="py-4 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            );
        }
    };
    console.log(categoryDropdownOpen);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-20 font-jura dark:bg-black ">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-6 ">
                <div
                    className="height-div flex justify-between h-22"
                    ref={scrollRef}
                >
                    {/* Left side - Brand */}
                    <div className="flex items-center ">
                        <Link
                            to={"/"}
                            className="flex-shrink-0 flex items-center"
                        >
                            <img
                                src={
                                    isDarkMode
                                        ? "/icons/speedometer-white.png"
                                        : "/icons/speedometer.png"
                                }
                                alt=""
                                className="h-14 w-14 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 transition-all duration-200"
                            />
                            <span
                                className="ml-2 text-2xl md:text-xl lg:text-2xl xl:text-3xl transition-all duration-200 font-bold text-transparent bg-clip-text font-jura"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1544159465-672a2b0d5f2c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                RedlineRush
                            </span>
                        </Link>
                    </div>
                    {/* Mobile menu button */}
                    {showNav && (
                        <div className="flex items-center md:hidden font-jura">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? (
                                    <svg
                                        className="block h-8 w-8 transition-transform duration-300 rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-8 w-8 transition-transform duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Right side - Navigation */}
                    {showNav && (
                        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6 xl:space-x-8 transition-all duration-200 font-jura">
                            {/* Categories Dropdown */}
                            <div className="relative" ref={categoryDropdownRef}>
                                <button
                                    onClick={() =>
                                        toggleDropdown(setCategoryDropdownOpen)
                                    }
                                    className="md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer dark:text-gray-300 dark:hover:text-white"
                                >
                                    Categories
                                    <svg
                                        className="w-4 h-4 ml-1 inline-block"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {categoryDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 md:w-34 lg:w-40 xl:w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                        <div className="py-1">
                                            {[
                                                "Reviews",
                                                "Guides",
                                                "Stories",
                                                "Travel",
                                                "Comparos",
                                                "Experience",
                                            ].map((item) => (
                                                <Link
                                                    to={`/category/${item}`}
                                                    key={item}
                                                    className="block md:px-2 md:py-1 xl:px-4 xl:py-2 md:text-md lg:text-lg xl:text-xl text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        setCategoryDropdownOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    {item}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Standard navigation items */}
                            {role !== "author" && (
                                <>
                                    <a
                                        href="#community"
                                        className="md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Community
                                    </a>
                                    <Link
                                        to="/gallery"
                                        className="md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Gallery
                                    </Link>
                                    {role !== "user" && (
                                        <Link
                                            to="/writer-signup"
                                            className="md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Write
                                        </Link>
                                    )}
                                    <Link
                                        to={"/about"}
                                        className="md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        About
                                    </Link>
                                </>
                            )}

                            {/* Writer-specific navigation items */}
                            {status && role === "author" && (
                                <>
                                    <Link
                                        to="/add-blog"
                                        className="md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Add Post
                                    </Link>
                                    <Link
                                        to="/edit-blog"
                                        className=" md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Update Post
                                    </Link>
                                    <Link
                                        to="/delete-blog"
                                        className=" md:text-md lg:text-lg xl:text-xl transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Delete Post
                                    </Link>
                                </>
                            )}

                            {/* Authentication */}
                            <ToggleDarkMode />
                            {renderAuthSection()}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {showNav && (
                <div
                    ref={mobileMenuRef}
                    className="md:hidden overflow-hidden opacity-0 h-0 bg-white dark:bg-black"
                    style={{ willChange: "height, opacity" }}
                >
                    <div className="py-4 space-y-1 font-jura">
                        <div
                            className="relative px-4"
                            ref={categoryDropdownRef}
                        >
                            <button
                                onClick={() =>
                                    toggleDropdown(setCategoryDropdownOpen)
                                }
                                className="w-full py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Categories
                                <svg
                                    className={`w-4 h-4 ml-1 inline-block transition-transform duration-300 ${
                                        categoryDropdownOpen ? "rotate-180" : ""
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {categoryDropdownOpen && (
                                <div className="mt-2 py-2 px-2 space-y-1">
                                    {[
                                        "Reviews",
                                        "Guides",
                                        "Stories",
                                        "Travel",
                                        "Comparos",
                                        "Experience",
                                    ].map((item) => (
                                        <Link
                                            to={`/category/${item}`}
                                            key={item}
                                            className="block px-4 py-3 text-center text-base font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-400 dark:hover:bg-gray-800"
                                            onClick={() => {
                                                setCategoryDropdownOpen(false);
                                                setIsOpen(false);
                                            }}
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {role !== "author" && (
                            <>
                                <a
                                    href="#community"
                                    className="block mx-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Community
                                </a>
                                <Link
                                    to="/gallery"
                                    className="block mx-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Gallery
                                </Link>
                                <Link
                                    to="/writer-signup"
                                    className="block mx-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Write
                                </Link>
                                <Link
                                    to={"/about"}
                                    className="block mx-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </Link>
                            </>
                        )}

                        {status && role === "author" && (
                            <>
                                <Link
                                    to="/add-blog"
                                    className="block mx-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Add Post
                                </Link>
                                <Link
                                    to="/edit-blog"
                                    className="block mx-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Update Post
                                </Link>
                                <Link
                                    to="/delete-blog"
                                    className="block mx-4 py-3 text-center text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Delete Post
                                </Link>
                            </>
                        )}

                        {/* Mobile Authentication */}
                        <div className="px-4 mt-4">
                            <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
                            {renderMobileAuthSection()}
                        </div>
                    </div>
                </div>
            )}
            <div className="border-b border-y-red-700 dark:border-red-700"></div>
        </nav>
    );
};

export default Navbar;
