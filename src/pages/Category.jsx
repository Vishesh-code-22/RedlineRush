import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "../components";
import dataService from "../appwrite/dataService";

const Category = () => {
    const { category } = useParams();
    // filter blogs based on category
    const blogData = useSelector((state) => state.blog.blogData);

    const filteredBlogs = blogData.filter((blog) => blog.category === category);

    return (
        <div
            className="flex w-full flex-col py-12 px-8 font-jura"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-6xl font-semibold tracking-wider pb-12 text-center">
                {category}
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

export default Category;
