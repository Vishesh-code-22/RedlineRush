import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dataService from "../appwrite/dataService";
import HorizontalCard from "../components/HorizontalCard";

const History = () => {
    const historyIds = useSelector((state) => state.auth.history);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistoryBlogs = async () => {
            try {
                const blogFetches = historyIds.map((id) =>
                    dataService.getPost(id)
                );
                const blogResults = await Promise.all(blogFetches);
                setBlogs(blogResults);
            } catch (error) {
                console.error("Failed to load history blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        if (historyIds?.length) fetchHistoryBlogs();
        else setLoading(false);
    }, [historyIds]);

    return (
        <div
            className="w-full px-8 py-12 font-jura"
            style={{ minHeight: "calc(100vh - 170px)" }}
        >
            <h2 className="text-5xl font-semibold tracking-wider pb-10 text-center">
                History
            </h2>

            {loading ? (
                <p className="text-center text-xl text-gray-500">Loading...</p>
            ) : blogs.length > 0 ? (
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
