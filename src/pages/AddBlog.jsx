import React from "react";
import { BlogForm } from "../components";

const AddBlog = () => {
    return (
        <div
            className="flex flex-col w-full font-jura sm:px-8 sm:bg-inherit sm:dark:bg-inherit bg-white dark:bg-gray-800 transition-all duration-200"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-5xl font-bold text-center py-4">Add Post</h2>
            <BlogForm />
        </div>
    );
};

export default AddBlog;
