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
            className="w-full flex flex-col py-12 px-4 sm:px-6 md:px-8 font-jura transition-all duration-200"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider pb-8 sm:pb-10 md:pb-12 text-center transition-all duration-200">
                {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full transition-all duration-200">
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
