import React from "react";
import { useSelector } from "react-redux";
import dataService from "../appwrite/dataService";
import { Card } from "../components";

const YourBlogs = () => {
    const userId = useSelector((state) => state.auth.userData.$id);
    const blogData = useSelector((state) => state.blog.blogData);
    const filteredBlogs = blogData.filter((blog) => blog.userId === userId);

    return (
        <div
            className="flex w-full flex-col py-12 px-8 font-jura"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-6xl font-semibold tracking-wider pb-12 text-center">
                Your Posts
            </h2>
            <div className="grid grid-cols-4 gap-8 w-full">
                {filteredBlogs.map((blog) => (
                    <Card
                        id={blog.$id}
                        key={blog.$id}
                        image={dataService.getArticleImagePreview(
                            blog.featuredImage
                        )}
                        title={blog.title}
                        content={blog.content}
                    />
                ))}
            </div>
        </div>
    );
};

export default YourBlogs;
