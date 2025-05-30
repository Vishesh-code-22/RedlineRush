import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dataService from "../appwrite/dataService";
import { setIsLoading } from "../store/utilitySlice";
import { setGalleryData } from "../store/otherSlice";

const Submit = () => {
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("/icons/submit-black.png");
    const [error, setError] = useState("");
    const [instagramHandle, setInstagramHandle] = useState("");
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.utility.isDarkMode);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            // Create a preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        dispatch(setIsLoading(true));

        try {
            if (photo) {
                // Update profile with avatar

                const imageId = (await dataService.uploadArticleImage(photo))
                    .$id;

                if (imageId) {
                    await dataService.addPhoto({
                        imageId,
                        owner: instagramHandle,
                    });

                    const imageUrl =
                        dataService.getArticleImagePreview(imageId);

                    dispatch(
                        setGalleryData({
                            id: imageId,
                            imageUrl,
                            owner: instagramHandle,
                        })
                    );
                    dispatch(setIsLoading(false));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleInstagramChange = (e) => {
        let value = e.target.value;

        // Remove @ if user included it
        if (value.startsWith("@")) {
            value = value.substring(1);
        }

        // Store with @ prefix in state
        setInstagramHandle(`@${value}`);
    };
    return (
        <div
            className="flex w-full justify-center items-center"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <div className="flex flex-col items-center justify-center sm:justify-baseline bg-white dark:bg-gray-800 p-8 sm:rounded-lg shadow-lg w-full h-[770px] sm:h-auto sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] font-jura transition-all duration-200">
                {/* Logo and Heading */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={
                            isDarkMode
                                ? "/icons/speedometer-white.png"
                                : "/icons/speedometer.png"
                        }
                        alt="Logo"
                        className="h-12 mb-4"
                    />
                    <h3 className="text-2xl font-bold mb-2">Submit Photo</h3>
                    <p className="text-gray-500 text-sm dark:text-gray-300">
                        Choose a cool photo you want to showcase
                    </p>
                </div>

                {/* Avatar Preview - Larger Size */}
                <div className="mb-8">
                    <div className="relative w-72 h-64 sm:w-86 sm:h-72 mx-auto">
                        <img
                            src={previewUrl}
                            alt="Profile"
                            className="sm:w-86 sm:h-72 w-72 h-64 border-4 rounded-2xl border-gray-200 dark:border-gray-700 object-cover"
                        />
                        <button
                            onClick={triggerFileInput}
                            className="absolute bottom-0 right-0 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="text-red-600 mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="w-full">
                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {/* Upload Button */}
                    <div className="w-full mb-6">
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className="w-full p-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-300"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Choose Image
                        </button>
                    </div>
                    <div className="w-full mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
                            htmlFor="instagram"
                        >
                            Instagram Handle
                        </label>
                        <div className="flex items-center">
                            <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg py-4 px-3 text-gray-500 dark:text-gray-800">
                                @
                            </span>
                            <input
                                id="instagram"
                                type="text"
                                value={instagramHandle}
                                onChange={handleInstagramChange}
                                placeholder="yourusername"
                                className="w-full p-4 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500"
                            />
                        </div>
                    </div>

                    {/* Save Button - Full Width */}
                    <button
                        type="submit"
                        className="w-full p-4 bg-gray-900 dark:bg-gray-300 text-white dark:text-black rounded-lg hover:bg-gray-600 dark:hover:bg-white transition cursor-pointer disabled:bg-gray-400"
                    >
                        Save & Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Submit;
