import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HalfCard } from "../components";
import dataService from "../appwrite/dataService";
import parse from "html-react-parser";
import { addHistory } from "../store/authSlice";

const Blog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const blogData = useSelector((state) => state.blog.blogData);
    const status = useSelector((state) => state.auth.status);
    const user = useSelector((state) => state.auth.userData);

    // make sure user is logged in and no duplicates
    if (status) {
        // take user id
        const userId = user.$id;
        // send to appwrite
        dataService
            .updateHistory(userId, id)
            .then((result) => {
                dispatch(addHistory(result.history));
            })
            .catch((error) => console.log(error));
    }

    const blog = blogData.find((blog) => blog.$id === id);

    const relatedBlogsFunction = () => {
        const filteredBlogs = blogData.filter((blog) => blog.$id !== id);
        if (filteredBlogs.length === 0) return null;
        if (filteredBlogs.length < 2) return filteredBlogs;
        const randomIndexes = [];
        while (randomIndexes.length < 2) {
            const randomIndex = Math.floor(
                Math.random() * filteredBlogs.length
            );
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
        return randomIndexes.map((index) => filteredBlogs[index]);
    };

    const relatedBlogs = relatedBlogsFunction();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return !blogData || blogData.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    ) : (
        <div className="main flex flex-col w-full font-jura">
            <div className="main-content flex flex-col w-full gap-6 md:gap-8 lg:gap-12 mt-4 md:mt-6 lg:mt-8 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-200">
                <div className="top flex flex-col w-full items-center">
                    <h2 className="title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider text-center pb-2 md:pb-4 transition-all duration-200">
                        {blog.title}
                    </h2>
                    <div className="blog-meta flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 items-center w-full sm:w-4/5 md:w-3/4 lg:w-1/2 justify-center transition-all duration-200">
                        <div className="user-data flex gap-2 items-center">
                            <img
                                src={blog.userAvatar}
                                alt="user photo"
                                className="user-photo h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full object-cover object-center transition-all duration-200"
                            />
                            <span className="user-name font-bold">
                                {blog.userName}
                            </span>
                        </div>
                        <span className="date font-bold text-gray-400">
                            <span>
                                {new Date(blog.$createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }
                                )}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="featured-image">
                    <img
                        src={dataService.getArticleImagePreview(
                            blog.featuredImage
                        )}
                        alt=""
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="content text-base sm:text-lg md:text-xl lg:text-2xl pb-4 md:pb-6 lg:pb-8 transition-all duration-200">
                    {parse(blog.content)}
                </div>
                {relatedBlogs && (
                    <div className="share flex justify-center gap-2 items-baseline pb-6 md:pb-8 lg:pb-12 transition-all duration-200">
                        <h3 className="title font-bold text-lg md:text-xl pr-2 transition-all duration-200">
                            Share:{" "}
                        </h3>
                        <a
                            href="#"
                            className="hover:text-black duration-150 font-semibold text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="hover:text-black duration-150 font-semibold text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                            Facebook
                        </a>
                    </div>
                )}
            </div>
            {relatedBlogs && relatedBlogs.length > 1 && (
                <div className="bottom flex flex-col w-full items-center border-t border-gray-900">
                    <h3 className="transition-all duration-200 title text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wider pt-4 md:pt-6 pb-4 md:pb-6">
                        Discover more
                    </h3>
                    <div className="transition-all duration-200 flex flex-col lg:flex-row items-center lg:justify-center lg:items-baseline lg:gap-16 w-full px-4 sm:px-6 md:px-12 py-4">
                        <HalfCard blog={relatedBlogs[0]} />
                        <HalfCard blog={relatedBlogs[1]} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
