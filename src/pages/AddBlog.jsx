import React from "react";
import { BlogForm } from "../components";

const AddBlog = () => {
    return (
        <div
            className="flex flex-col w-full font-jura px-8"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-5xl font-bold text-center py-4">Add Post</h2>
            <BlogForm />
        </div>
    );
};

export default AddBlog;
