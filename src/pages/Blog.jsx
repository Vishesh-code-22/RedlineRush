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
    // dispatch
    // Note: Any code here will execute BEFORE the Promise resolves

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
            <div className="main-content flex flex-col w-full gap-12 mt-8 px-32">
                <div className="top flex flex-col w-full items-center">
                    <h2 className="title text-6xl font-semibold tracking-wider text-center pb-4">
                        {blog.title}
                    </h2>
                    <div className="blog-meta flex gap-12 items-center w-1/2 justify-center">
                        <div className="user-data flex gap-2 items-center">
                            <img
                                src={blog.userAvatar}
                                alt="user photo"
                                className="user-photo h-12 w-12 rounded-full object-cover object-center"
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
                    />
                </div>
                <div className="content text-2xl pb-8">
                    {parse(blog.content)}
                </div>
                {relatedBlogs && (
                    <div className="share flex justify-center gap-2 items-baseline pb-12">
                        <h3 className="title font-bold text-xl pr-2">
                            Share:{" "}
                        </h3>
                        <a
                            href="#"
                            className="hover:text-black duration-150 font-semibold text-gray-600"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="hover:text-black duration-150 font-semibold text-gray-600"
                        >
                            Facebook
                        </a>
                    </div>
                )}
            </div>
            {relatedBlogs && relatedBlogs.length > 1 && (
                <div className="bottom flex flex-col w-full items-center border-t border-gray-900">
                    <h3 className="title text-4xl font-semibold tracking-wider pt-6">
                        Discover more
                    </h3>
                    <div className="flex items-center justify-center w-full gap-24">
                        <HalfCard blog={relatedBlogs[0]} />
                        <HalfCard blog={relatedBlogs[1]} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
