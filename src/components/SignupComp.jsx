import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import authService from "../appwrite/authService";
import { setIsLoading, setShowNav } from "../store/utilitySlice";

const SignupComp = ({ writerSignup = false }) => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signup = async (data) => {
        setError("");
        dispatch(setIsLoading(true));
        dispatch(setShowNav(false));
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
                console.log(userInfo.$id);
                dispatch(setIsLoading(false));
                navigate(`/add-avatar/${userInfo.$id}`);
            }
            // navigate("/");
            reset();
        } catch (error) {
            setError(error.message);
        }
    };

    const password = watch("password");

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-[30%] font-jura">
            {/* Logo and Heading */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src="/icons/speedometer.png"
                    alt="Logo"
                    className="h-12 mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">
                    {writerSignup ? (
                        <>
                            Join us as an{" "}
                            <strong className="text-blue-500">Author</strong>
                        </>
                    ) : (
                        "Welcome back"
                    )}
                </h3>
                <p className="text-gray-500 text-sm">
                    Please enter your details to sign up.
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

            <form onSubmit={handleSubmit(signup)} className="w-full">
                <div className="w-full mb-4">
                    <label className="text-sm font-medium">Full name</label>
                    <input
                        type="text"
                        placeholder="Enter your full name..."
                        className="w-full p-2 border border-gray-600 flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        {...register("name", {
                            required: true,
                        })}
                    />
                </div>
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

                <div className="w-full mb-4">
                    <label className="text-sm font-medium">
                        Confirm password
                    </label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            placeholder="********"
                            className="w-full p-2 border border-gray-600 flex items-center rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-300 pr-10"
                            {...register("cnf_password", {
                                required: true,
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
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

                {errors.cnf_password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.cnf_password.message}
                    </p>
                )}

                {/* Sign In Button */}
                <button
                    type="submit"
                    className={`w-full p-3 ${
                        writerSignup ? "bg-blue-500" : "bg-gray-900"
                    } text-white rounded-lg ${
                        writerSignup ? "hover:bg-blue-900" : "hover:bg-gray-600"
                    } transition cursor-pointer`}
                >
                    {writerSignup ? "Sign up as author" : "Sign up"}
                </button>
            </form>
            <p className="text-sm mt-4 text-gray-500">
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
