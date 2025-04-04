import React from "react";
import { useParams } from "react-router-dom";
import { BlogForm } from "../components";
import { useSelector } from "react-redux";
import dataService from "../appwrite/dataService";

const EditThisBlog = () => {
    const { id } = useParams();
    const post = useSelector((state) =>
        state.blog.blogData.find((post) => post.$id === id)
    );
    const image = dataService.getArticleImagePreview(post.featuredImage);
    return (
        <div
            className="flex flex-col w-full font-jura px-8"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-5xl font-bold text-center py-4">Edit Post</h2>
            <BlogForm post={post} image={image} />
        </div>
    );
};

export default EditThisBlog;
