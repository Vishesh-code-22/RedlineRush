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
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-[30%] font-jura">
            {/* Logo and Heading */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src="/icons/speedometer.png"
                    alt="Logo"
                    className="h-12 mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">
                    {writerlogin ? (
                        <>
                            Welcome back{" "}
                            <strong className="text-blue-500">Author</strong>
                        </>
                    ) : (
                        "Welcome back"
                    )}
                </h3>
                <p className="text-gray-500 text-sm">
                    Please enter your details to sign in.
                </p>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 w-full gap-4 mb-4">
                <button className="mx-auto px-12 py-2 border border-gray-600 cursor-pointer rounded-lg shadow-sm hover:bg-gray-100 duration-100">
                    <img src="/icons/apple.png" alt="Apple" className="h-6" />
                </button>
                <button className="mx-auto px-12 py-2 border border-gray-600 cursor-pointer rounded-lg shadow-sm hover:bg-gray-100 duration-100">
                    <img src="/icons/google.png" alt="Google" className="h-6" />
                </button>
                <button className="mx-auto px-12 py-2 border border-gray-600 cursor-pointer rounded-lg shadow-sm hover:bg-gray-100 duration-100">
                    <img
                        src="/icons/twitter.png"
                        alt="Twitter"
                        className="h-6"
                    />
                </button>
            </div>

            {/* OR Divider */}
            <div className="flex items-center w-full my-4">
                <span className="h-px w-full bg-gray-300"></span>
                <span className="px-3 text-gray-500">OR</span>
                <span className="h-px w-full bg-gray-300"></span>
            </div>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(signin)} className="w-full">
                <div className="w-full mb-4">
                    <label className="text-sm font-medium">
                        E-Mail Address
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email..."
                        className="w-full p-2 border border-gray-600 flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                </div>
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}

                <div className="w-full mb-4">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            placeholder="********"
                            className="w-full p-2 border border-gray-600 flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300 pr-10"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {/* Show/Hide Password Button */}
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "🙈"}
                        </button>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="w-full flex justify-between text-sm mb-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            className="cursor-pointer"
                        />
                        <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="#" className="text-blue-500 hover:underline">
                        Forgot password?
                    </a>
                </div>

                {/* Sign In Button */}
                <button
                    type="submit"
                    className={`w-full p-3 ${
                        writerlogin ? "bg-blue-500" : "bg-gray-900"
                    } text-white rounded-lg ${
                        writerlogin ? "hover:bg-blue-900" : "hover:bg-gray-600"
                    } transition cursor-pointer`}
                >
                    Sign in
                </button>
            </form>

            {/* Sign Up Link */}
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
