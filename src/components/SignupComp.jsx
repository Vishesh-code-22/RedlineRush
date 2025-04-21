import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import authService from "../appwrite/authService";
import { setShowNav } from "../store/utilitySlice";

const SignupComp = ({ writerSignup = false }) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signup = async (data) => {
        setError("");
        setLoading(true);
        dispatch(setShowNav(true));
        try {
            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: writerSignup ? "author" : "user",
            };

            const user = await authService.createAccount(userData);

            if (user) {
                const userInfo = await authService.getCurrentUser();
                // Take user photo and dispatch WITH it, Required
                dispatch(login({ userData: userInfo, role: userData.role }));
                setLoading(false);
                dispatch(setShowNav(false));
                navigate(`/add-avatar/${userInfo.$id}`);
                reset();
            }
            // navigate("/");
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const password = watch("password");

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);
    return loading ? (
        <div className="flex items-center justify-center min-h-screen caret-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center sm:justify-baseline bg-white dark:bg-gray-800 p-8 sm:rounded-lg shadow-lg w-full h-[770px] sm:h-auto sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] font-jura transition-all duration-200">
            {/* Logo and Heading */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src="/icons/speedometer.png"
                    alt="Logo"
                    className="h-12 mb-4 dark:invert"
                />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {writerSignup ? (
                        <>
                            Join us as an{" "}
                            <strong className="text-blue-500">Author</strong>
                        </>
                    ) : (
                        "Create your account"
                    )}
                </h3>
                <p className="text-gray-500 text-sm dark:text-gray-300">
                    Please enter your details to sign up.
                </p>
            </div>
            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 w-full gap-4 mb-4">
                {["apple", "google", "twitter"].map((platform) => (
                    <button
                        key={platform}
                        className="mx-auto px-8 sm:px-12 py-2 border dark:bg-gray-300 dark:hover:bg-gray-50 border-gray-600 dark:border-gray-400 cursor-pointer rounded-lg shadow-sm hover:bg-gray-100 transition duration-100"
                    >
                        <img
                            src={`/icons/${platform}.png`}
                            alt={platform}
                            className="h-6"
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
            <form onSubmit={handleSubmit(signup)} className="w-full">
                {/* Name */}
                <div className="w-full mb-4">
                    <label className="text-sm font-medium dark:text-gray-300">
                        Full name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your full name..."
                        className="w-full p-2 border border-gray-600 dark:border-gray-500 bg-white dark:bg-gray-700 text-black dark:text-white flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                        {...register("name", { required: true })}
                    />
                </div>

                {/* Email */}
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

                {/* Password */}
                <div className="w-full mb-4">
                    <label className="text-sm font-medium dark:text-gray-300">
                        Password
                    </label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            className="w-full p-2 border border-gray-600 dark:border-gray-500 bg-white dark:bg-gray-700 text-black dark:text-white flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 pr-10"
                            {...register("password", { required: true })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="w-full mb-4">
                    <label className="text-sm font-medium dark:text-gray-300">
                        Confirm Password
                    </label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            className="w-full p-2 border border-gray-600 dark:border-gray-500 bg-white dark:bg-gray-700 text-black dark:text-white flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 pr-10"
                            {...register("cnf_password", {
                                required: true,
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {errors.cnf_password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.cnf_password.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full p-4 ${
                        writerSignup
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-900 hover:bg-gray-600"
                    } text-white dark:bg-gray-300 dark:hover:bg-white dark:text-black rounded-lg transition cursor-pointer`}
                >
                    Sign Up
                </button>
            </form>
            {/* Link to Login */}
            <p className="text-sm mt-4 text-gray-500 dark:text-gray-300">
                {writerSignup ? "Already a member? " : ""}
                {writerSignup ? (
                    <Link
                        to={"/writer-login"}
                        className="text-blue-500 font-medium hover:underline"
                    >
                        Log in as author
                    </Link>
                ) : (
                    ""
                )}
            </p>
        </div>
    );
};

export default SignupComp;
