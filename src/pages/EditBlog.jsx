import React from "react";
import { useSelector } from "react-redux";

const EditBlog = () => {
    const userId = useSelector((state) => state.auth.userData.$id);
    const blogData = useSelector((state) => state.blog.blogData);
    const filteredBlogs = blogData.filter((blog) => blog.userId === userId);
    console.log(filteredBlogs);

    return <div>EditBlog</div>;
};

export default EditBlog;
