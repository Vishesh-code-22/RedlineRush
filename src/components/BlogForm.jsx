import React, { useCallback, useEffect } from "react";
import RTE from "./RTE";
import Select from "./Select";
import { useForm } from "react-hook-form";
import dataService from "../appwrite/dataService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBlog } from "../store/blogSlice";

const BlogForm = () => {
    const { register, handleSubmit, control, getValues, watch, setValue } =
        useForm();
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitBlog = async (data) => {
        const file = await dataService.uploadArticleImage(data.image[0]);
        if (file) {
            data.featuredImage = file.$id;
            data.userId = userData.$id;
            const post = await dataService.createPost(data);
            if (post) {
                dispatch(addBlog(post));
                navigate(`/blog/${post.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submitBlog)}
            className="flex flex-col md:flex-row gap-8 w-full rounded-2xl full-shadow p-2 bg-white"
        >
            <div className="flex flex-col w-full md:w-1/2 gap-4">
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="title"
                        className="text-md font-semibold text-gray-700 mb-2"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        {...register("title", { required: true })}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="slug"
                        className="text-md font-semibold text-gray-700 mb-2"
                    >
                        Slug
                    </label>
                    <input
                        type="text"
                        id="slug"
                        readOnly
                        placeholder="enter-slug-here"
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        {...register("slug", { required: true })}
                    />
                </div>
                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    getValues={getValues("content")}
                    className="w-full "
                />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-4">
                <div className="w-full">
                    <div className="flex flex-col">
                        <label
                            htmlFor="image"
                            className="text-md font-semibold text-gray-700 mb-2"
                        >
                            Featured image
                        </label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                            <input
                                type="file"
                                id="image"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                {...register("image", { required: true })}
                            />
                        </div>
                    </div>
                </div>
                <Select
                    label="Category"
                    options={[
                        "Reviews",
                        "Guides",
                        "Stories",
                        "Travel",
                        "Comparos",
                        "Experience",
                    ]}
                    className="w-full"
                    labelClassName="text-sm font-medium text-gray-700 mb-2"
                    selectClassName="px-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    {...register("category", { required: true })}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="w-full"
                    labelClassName="text-sm font-medium text-gray-700 mb-2"
                    selectClassName="px-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    {...register("status", { required: true })}
                />
                <button
                    type="submit"
                    className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Publish Blog
                </button>
            </div>
        </form>
    );
};

export default BlogForm;
