import React from "react";
import { Link } from "react-router-dom";
import dataService from "../appwrite/dataService";

const HalfCard = ({ blog }) => {
    return (
        <Link
            to={`/blog/${blog.$id}`}
            className="flex flex-col w-1/3 mt-8 pb-8 mb-8 hover:shadow-2xl duration-300 transition-all ease-in-out rounded hover:scale-101"
        >
            <img
                src={dataService.getArticleImagePreview(blog.featuredImage)}
                alt=""
                className="h-80 object-cover w-full pb-2 rounded"
            />
            <h2 className="text-2xl text-center font-semibold">{blog.title}</h2>
        </Link>
    );
};

export default HalfCard;
