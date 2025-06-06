import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, DeleteCard } from "../components";
import { deleteBlog } from "../store/blogSlice";
import dataService from "../appwrite/dataService";
import { setIsLoading } from "../store/utilitySlice";
const DeleteBlog = () => {
    const userId = useSelector((state) => state.auth.userData.$id);
    const blogData = useSelector((state) => state.blog.blogData);
    const dispatch = useDispatch();
    const filteredBlogs = blogData.filter((blog) => blog.userId === userId);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteImage, setDeleteImage] = useState(null);
    const handleDelete = (id) => {
        setPopupOpen(true);
        setDeleteId(id);
        setDeleteImage(blogData.find((blog) => blog.$id === id).featuredImage);
        setSelectedTitle(blogData.find((blog) => blog.$id === id).title);
    };

    const confirmDelete = async () => {
        setPopupOpen(false);
        dispatch(setIsLoading(true));
        await dataService.deletePost(deleteId);
        await dataService.deleteArticleImage(deleteImage);
        dispatch(deleteBlog(deleteId));
        dispatch(setIsLoading(false));
    };

    return (
        <div
            className="w-full flex flex-col py-12 px-4 sm:px-6 md:px-8 font-jura transition-all duration-200"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider pb-8 sm:pb-10 md:pb-12 text-center transition-all duration-200">
                Delete Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full transition-all duration-200">
                {filteredBlogs.map((blog) => (
                    <DeleteCard
                        id={blog.$id}
                        key={blog.$id}
                        image={dataService.getArticleImagePreview(
                            blog.featuredImage
                        )}
                        title={blog.title}
                        content={blog.content}
                        delete={true}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>

            {popupOpen && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-[90%] max-w-md text-center transition-all duration-200">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="mb-6 text-sm sm:text-base">
                            Are you sure you want to delete{" "}
                            <strong>"{selectedTitle}"</strong>?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-200"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setPopupOpen(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-all duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteBlog;
