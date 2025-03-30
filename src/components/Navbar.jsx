import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    // Take status, role and userdata from store
    // Conditionally show different navbars
    const { status, role, userData } = useSelector((state) => state.auth);
    console.log(userData?.name);

    const [isOpen, setIsOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const scrollRef = useRef();

    // Mock user state - replace with your actual auth logic
    const [userState, setUserState] = useState({
        isLoggedIn: false,
        isWriter: false,
        username: "JohnDoe",
    });

    const toggleDropdown = (setter) => {
        setter((prev) => !prev);
    };

    // For demo purposes - toggle between different user states
    const toggleUserState = () => {
        if (!userState.isLoggedIn) {
            setUserState({
                isLoggedIn: true,
                isWriter: false,
                username: "JohnDoe",
            });
        } else if (!userState.isWriter) {
            setUserState({
                isLoggedIn: true,
                isWriter: true,
                username: "JohnDoe",
            });
        } else {
            setUserState({
                isLoggedIn: false,
                isWriter: false,
                username: "JohnDoe",
            });
        }
    };

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

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-20">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-6">
                <div
                    className="height-div flex justify-between h-22"
                    ref={scrollRef}
                >
                    {/* Left side - Brand */}
                    <div className="flex items-center">
                        <Link
                            to={"/"}
                            className="flex-shrink-0 flex items-center"
                        >
                            <img
                                src="/icons/speedometer.png"
                                alt=""
                                className="h-18 w-18"
                            />
                            <span className="ml-2 text-xl font-medium text-gray-900 eurostile-font">
                                RedlineRush
                            </span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden font-jura">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg
                                    className="block h-6 w-6"
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
                                    className="block h-6 w-6"
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

                    {/* Right side - Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-4 font-jura">
                        {/* Categories Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    toggleDropdown(setCategoryDropdownOpen)
                                }
                                className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
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
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
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
                                                className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
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
                                    className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Community
                                </a>
                                <a
                                    href="#gallery"
                                    className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Gallery
                                </a>
                                <Link
                                    to="/writer-signup"
                                    className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Write
                                </Link>
                                <Link
                                    to={"/about"}
                                    className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                >
                                    About
                                </Link>
                            </>
                        )}

                        {/* Writer-specific navigation items */}
                        {status && role === "author" && (
                            <>
                                <a
                                    href="#add-post"
                                    className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Add Post
                                </a>
                                <a
                                    href="#update-post"
                                    className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Update Post
                                </a>
                                <a
                                    href="#delete-post"
                                    className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Delete Post
                                </a>
                            </>
                        )}

                        {/* Authentication */}
                        {!status ? (
                            <Link
                                to={"/login"}
                                className="ml-2 px-6 py-1 text-xl font-medium text-white bg-black rounded-md hover:bg-gray-800"
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="relative ml-3">
                                <button
                                    onClick={() =>
                                        toggleDropdown(setProfileDropdownOpen)
                                    }
                                    className="flex text-xl rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                        {userData.name.charAt(0).toUpperCase()}
                                    </div>
                                </button>

                                {profileDropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                        <div className="py-1">
                                            {role !== "author" ? (
                                                <>
                                                    <a
                                                        href="#history"
                                                        className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                                                        onClick={() =>
                                                            setProfileDropdownOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        History
                                                    </a>
                                                    <a
                                                        href="#read-list"
                                                        className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                                                        onClick={() =>
                                                            setProfileDropdownOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Read List
                                                    </a>
                                                </>
                                            ) : (
                                                <a
                                                    href="#your-blogs"
                                                    className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                                                    onClick={() =>
                                                        setProfileDropdownOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    Your Blogs
                                                </a>
                                            )}
                                            <a
                                                href="#logout"
                                                className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                                                onClick={() =>
                                                    setProfileDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Logout
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Demo toggle button - remove in production */}
                        <button
                            onClick={toggleUserState}
                            className="hidden ml-2 px-2 py-1 text-xs font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                        >
                            Demo: Toggle User State
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isOpen && (
                <div className="sm:hidden border-t border-gray-200 font-jura">
                    <div className="pt-2 pb-3 space-y-1">
                        <button
                            onClick={() =>
                                toggleDropdown(setCategoryDropdownOpen)
                            }
                            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
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
                            <div className="pl-6 pr-4 py-2 space-y-1">
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
                                        className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                        onClick={() =>
                                            setCategoryDropdownOpen(false)
                                        }
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {!userState.isWriter && (
                            <>
                                <a
                                    href="#community"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Community
                                </a>
                                <a
                                    href="#gallery"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Gallery
                                </a>
                                <Link
                                    href="/writer-signup"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Write
                                </Link>
                                <Link
                                    to={"/about"}
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    About
                                </Link>
                            </>
                        )}

                        {userState.isLoggedIn && userState.isWriter && (
                            <>
                                <a
                                    href="#add-post"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Add Post
                                </a>
                                <a
                                    href="#update-post"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Update Post
                                </a>
                                <a
                                    href="#delete-post"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Delete Post
                                </a>
                            </>
                        )}

                        {!userState.isLoggedIn ? (
                            <Link
                                to={"/login"}
                                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                            >
                                Login
                            </Link>
                        ) : (
                            <>
                                <div className="pl-3 pr-4 py-2 flex items-center">
                                    <div className="mr-3 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                        {userState.username
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <span className="font-medium">
                                        {userState.username}
                                    </span>
                                </div>

                                {!userState.isWriter ? (
                                    <>
                                        <a
                                            href="#history"
                                            className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                        >
                                            History
                                        </a>
                                        <a
                                            href="#read-list"
                                            className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                        >
                                            Read List
                                        </a>
                                    </>
                                ) : (
                                    <a
                                        href="#your-blogs"
                                        className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                    >
                                        Your Blogs
                                    </a>
                                )}
                                <a
                                    href="#logout"
                                    className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Logout
                                </a>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div className="border-b border-y-gray-900"></div>
        </nav>
    );
};

export default Navbar;
