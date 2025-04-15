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
gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    // Take status, role and userdata from store
    // Conditionally show different navbars
    const { status, role, userData, avatar } = useSelector(
        (state) => state.auth
    );

    const { showNav } = useSelector((state) => state.utility);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const scrollRef = useRef();
    const categoryDropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);

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

    // Render login button if status is explicitly false, otherwise show loading
    const renderAuthSection = () => {
        if (status === false) {
            return (
                <Link
                    to={"/login"}
                    className="ml-2 px-6 py-1 text-xl font-medium text-white bg-black rounded-md hover:bg-gray-800"
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
                                        <a
                                            href="#history"
                                            className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            History
                                        </a>
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
                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                    Login
                </Link>
            );
        } else if (status === true && userData) {
            return (
                <div ref={profileDropdownRef}>
                    <div className="pl-3 pr-4 py-2 flex items-center">
                        <div className="mr-3 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{userData.name}</span>
                    </div>

                    {role !== "author" ? (
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
                        <Link
                            to="/your-blogs"
                            className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                        >
                            Your Blogs
                        </Link>
                    )}
                    <button
                        className="block pl-6 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            );
        } else {
            // Loading state
            return (
                <div className="pl-3 pr-4 py-2 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            );
        }
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-20 font-jura">
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
                    {showNav && (
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
                    )}

                    {/* Right side - Navigation */}
                    {showNav && (
                        <div className="hidden sm:flex sm:items-center sm:space-x-4 font-jura">
                            {/* Categories Dropdown */}
                            <div className="relative" ref={categoryDropdownRef}>
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
                                    {role !== "user" && (
                                        <Link
                                            to="/writer-signup"
                                            className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                        >
                                            Write
                                        </Link>
                                    )}
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
                                    <Link
                                        to="/add-blog"
                                        className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                    >
                                        Add Post
                                    </Link>
                                    <Link
                                        to="/edit-blog"
                                        className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                    >
                                        Update Post
                                    </Link>
                                    <Link
                                        to="/delete-blog"
                                        className="px-3 py-2 text-xl font-medium text-gray-700 hover:text-gray-900"
                                    >
                                        Delete Post
                                    </Link>
                                </>
                            )}

                            {/* Authentication */}
                            {renderAuthSection()}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {isOpen && showNav && (
                <div className="sm:hidden border-t border-gray-200 font-jura">
                    <div className="pt-2 pb-3 space-y-1">
                        <div ref={categoryDropdownRef}>
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
                        </div>

                        {role !== "author" && (
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
                                    to="/writer-signup"
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

                        {status && role === "author" && (
                            <>
                                <Link
                                    to="/add-blog"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Add Post
                                </Link>
                                <Link
                                    to="/edit-blog"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Update Post
                                </Link>
                                <Link
                                    to="/delete-blog"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                >
                                    Delete Post
                                </Link>
                            </>
                        )}

                        {/* Mobile Authentication */}
                        {renderMobileAuthSection()}
                    </div>
                </div>
            )}
            <div className="border-b border-y-gray-900"></div>
        </nav>
    );
};

export default Navbar;
