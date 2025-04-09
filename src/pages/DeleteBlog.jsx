import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, DeleteCard } from "../components";
import { deleteBlog } from "../store/blogSlice";
import dataService from "../appwrite/dataService";
const DeleteBlog = () => {
    const userId = useSelector((state) => state.auth.userData.$id);
    const blogData = useSelector((state) => state.blog.blogData);
    const filteredBlogs = blogData.filter((blog) => blog.userId === userId);
    const dispatch = useDispatch();
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const handleDelete = (id) => {
        setPopupOpen(true);
        setDeleteId(id);
        setSelectedTitle(blogData.find((blog) => blog.$id === id).title);
    };

    const confirmDelete = async () => {
        setPopupOpen(false);
        await dataService.deletePost(deleteId);
        dispatch(deleteBlog(deleteId));
        console.log("blog data", blogData);
    };
    console.log("filteredBlogs", filteredBlogs);

    return (
        <div
            className="flex w-full flex-col py-12 px-8 font-jura"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-6xl font-semibold tracking-wider pb-12 text-center">
                Delete Posts
            </h2>
            <div className="grid grid-cols-4 gap-8 w-full">
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
                    <div className="bg-white p-8 rounded shadow-lg w-[90%] max-w-md text-center">
                        <h3 className="text-2xl font-semibold mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="mb-6">
                            Are you sure you want to delete{" "}
                            <strong>"{selectedTitle}"</strong>?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setPopupOpen(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
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
