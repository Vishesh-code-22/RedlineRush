import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { addAvatar, login } from "../store/authSlice";

const LoginComp = ({ writerlogin = false }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const signin = async (data) => {
        setLoading(true);
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userInfo = await authService.getCurrentUser();
                const userData = await authService.getUserMetaData(
                    userInfo.$id
                );
                const role = userData.role;

                // Check if the user has the correct role for this login page
                if (writerlogin && role !== "author") {
                    setError(
                        "This login page is for authors only. Please use the regular login page."
                    );
                    await authService.logout();
                    setLoading(false); // Log them out since they used the wrong page
                    return;
                } else if (!writerlogin && role === "author") {
                    setError(
                        "Authors should use the author login page. Please use the author login page."
                    );
                    await authService.logout();
                    setLoading(false); // Log them out since they used the wrong page
                    return;
                }

                // If role is correct, proceed with login
                dispatch(login({ userData: userInfo, role: role }));
                dispatch(addAvatar(userData.avatar));
                navigate("/");
                reset();
            }
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);

    return !loading ? (
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[30%] font-jura">
            {/* Logo and Heading */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src="/icons/speedometer.png"
                    alt="Logo"
                    className="h-12 mb-4 dark:invert"
                />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {writerlogin ? (
                        <>
                            Welcome back{" "}
                            <strong className="text-blue-500">Author</strong>
                        </>
                    ) : (
                        "Welcome back"
                    )}
                </h3>
                <p className="text-gray-500 text-sm dark:text-gray-300">
                    Please enter your details to sign in.
                </p>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 w-full gap-4 mb-4">
                {["apple", "google", "twitter"].map((platform) => (
                    <button
                        key={platform}
                        className="mx-auto px-12 py-2 border border-gray-600 dark:border-gray-400 cursor-pointer rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-100"
                    >
                        <img
                            src={`/icons/${platform}.png`}
                            alt={platform}
                            className="h-6 dark:invert"
                        />
                    </button>
                ))}
            </div>

            {/* OR Divider */}
            <div className="flex items-center w-full my-4">
                <span className="h-px w-full bg-gray-300 dark:bg-gray-600"></span>
                <span className="px-3 text-gray-500 dark:text-gray-400">
                    OR
                </span>
                <span className="h-px w-full bg-gray-300 dark:bg-gray-600"></span>
            </div>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(signin)} className="w-full">
                <div className="w-full mb-4">
                    <label className="text-sm font-medium dark:text-gray-300">
                        E-Mail Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email..."
                        className="w-full p-2 border border-gray-600 dark:border-gray-500 bg-white dark:bg-gray-700 text-black dark:text-white flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                        value
                                    ) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="w-full mb-4">
                    <label className="text-sm font-medium dark:text-gray-300">
                        Password
                    </label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password..."
                            className="w-full p-2 border border-gray-600 dark:border-gray-500 bg-white dark:bg-gray-700 text-black dark:text-white flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full p-4 bg-gray-900 dark:bg-gray-300 text-white dark:text-black rounded-lg hover:bg-gray-600 dark:hover:bg-white transition cursor-pointer"
                >
                    Login
                </button>
            </form>

            {/* Register Link */}
            <p className="text-sm mt-4 text-gray-500">
                Don't have an account yet?{" "}
                <Link
                    to={writerlogin ? "/writer-signup" : "/signup"}
                    className="text-blue-500 font-medium hover:underline"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin caret-transparent"></div>
        </div>
    );
};

export default LoginComp;
