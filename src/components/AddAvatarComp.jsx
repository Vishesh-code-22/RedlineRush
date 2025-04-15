import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAvatar } from "../store/authSlice";
import dataService from "../appwrite/dataService";
import { setIsLoading } from "../store/utilitySlice";

const AddAvatarComp = ({ id }) => {
    const [avatar, setAvatar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("/icons/user.png");
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
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
            if (avatar) {
                // Update profile with avatar
                const avatarId = (await dataService.uploadUserImage(avatar))
                    .$id;
                if (avatarId) {
                    await dataService.submitUserImage(avatarId, id);
                    dispatch(addAvatar(avatarId));
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

    return (
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-[30%] font-jura">
            {/* Logo and Heading */}
            <div className="flex flex-col items-center mb-6">
                <img
                    src="/icons/speedometer.png"
                    alt="Logo"
                    className="h-12 mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">Add Profile Picture</h3>
                <p className="text-gray-500 text-sm">
                    Choose a profile picture for your account
                </p>
            </div>

            {/* Avatar Preview - Larger Size */}
            <div className="mb-8">
                <div className="relative w-48 h-48 mx-auto">
                    <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-48 h-48 rounded-full border-4 border-gray-200 object-contain"
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

            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

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
                        className="w-full p-4 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2 text-gray-500"
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

                {/* Save Button - Full Width */}
                <button
                    type="submit"
                    className="w-full p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-600 transition cursor-pointer disabled:bg-gray-400"
                >
                    Save & Continue
                </button>
            </form>
        </div>
    );
};

export default AddAvatarComp;
