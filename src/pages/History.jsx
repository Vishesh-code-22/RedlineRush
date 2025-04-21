import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dataService from "../appwrite/dataService";
import HorizontalCard from "../components/HorizontalCard";

const History = () => {
    const historyIds = useSelector((state) => state.auth.history);
    const blogData = useSelector((state) => state.blog.blogData);
    const [blogs, setBlogs] = useState([]);
    console.log(historyIds);

    useEffect(() => {
        if (historyIds && blogData) {
            const matchedBlogs = historyIds
                .map((id) => blogData.find((blog) => blog.$id === id))
                .filter((blog) => blog); // Remove nulls in case any blog is missing
            setBlogs(matchedBlogs);
        }
    }, [historyIds, blogData]);

    return (
        <div
            className="w-full px-8 py-12 font-jura"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-5xl font-semibold tracking-wider pb-10 text-center">
                History
            </h2>

            {blogs.length > 0 ? (
                <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                    {blogs.map((blog) => (
                        <HorizontalCard
                            key={blog.$id}
                            id={blog.$id}
                            image={dataService.getArticleImagePreview(
                                blog.featuredImage
                            )}
                            title={blog.title}
                            content={blog.content}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500">
                    No history yet.
                </p>
            )}
        </div>
    );
};

export default History;
