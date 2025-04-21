import React from "react";
import { Link } from "react-router-dom";
import dataService from "../appwrite/dataService";

const HalfCard = ({ blog }) => {
    return (
        <Link
            to={`/blog/${blog.$id}`}
            className="flex flex-col w-full md:w-[80%] lg:w-[40%] 2xl:w-1/3 pb-6 md:pb-8 hover:shadow-2xl duration-300 transition-all ease-in-out rounded hover:scale-101"
        >
            <img
                src={dataService.getArticleImagePreview(blog.featuredImage)}
                alt=""
                className="h-56 md:h-72 lg:h-56 xl:h-80 object-cover w-full pb-2 rounded"
            />
            <h2 className="text-xl md:text-2xl text-center font-semibold">
                {blog.title}
            </h2>
        </Link>
    );
};

export default HalfCard;
