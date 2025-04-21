import React, { useCallback, useEffect, useState } from "react";
import RTE from "./RTE";
import Select from "./Select";
import { useForm } from "react-hook-form";
import dataService from "../appwrite/dataService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBlog, editBlog } from "../store/blogSlice";
import { setIsLoading } from "../store/utilitySlice";

const BlogForm = ({ post, image }) => {
    const { register, handleSubmit, control, getValues, watch, setValue } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active",
                category: post?.category || "Reviews",
            },
        });
    const userData = useSelector((state) => state.auth.userData);
    const avatarId = useSelector((state) => state.auth.avatar);
    const avatar = dataService.getUserImagePreview(avatarId);
    console.log(avatar);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [previewURL, setPreviewURL] = useState(image ? image : "");
    const submitBlog = async (data) => {
        dispatch(setIsLoading(true));
        if (post) {
            const file = data.image[0]
                ? await dataService.uploadArticleImage(data.image[0])
                : null;

            if (file) {
                await dataService.deleteArticleImage(post.featuredImage);
            }
            data.featuredImage = file.$id;
            const updatedPost = await dataService.editPost(post.$id, data);
            if (updatedPost) {
                dispatch(editBlog(updatedPost));
                dispatch(setIsLoading(false));
                navigate(`/blog/${post.$id}`);
            }
        } else {
            const file = await dataService.uploadArticleImage(data.image[0]);
            if (file) {
                data.featuredImage = file.$id;
                data.userId = userData.$id;
                data.userName = userData.name;
                data.userAvatar = avatar;
                const post = await dataService.createPost(data);
                if (post) {
                    dispatch(addBlog(post));
                    dispatch(setIsLoading(false));
                    navigate(`/blog/${post.$id}`);
                }
            }
        }
    };

    const handleImageInput = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewURL(previewUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }
        };
    }, [previewURL]);

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
            className="flex flex-col md:flex-row gap-8 w-full sm:rounded-2xl full-shadow p-2 bg-white dark:bg-gray-800 transition-all duration-200"
        >
            <div className="flex flex-col w-full md:w-1/2 gap-4 transition-all duration-200">
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="title"
                        className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2"
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
                        className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2"
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
                    defaultValue={getValues("content")}
                    className="w-full "
                />
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-4 transition-all duration-200">
                <div className="w-full">
                    <div className="flex flex-col">
                        <label
                            htmlFor="image"
                            className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2"
                        >
                            Featured image
                        </label>
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                            <input
                                type="file"
                                id="image"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                {...register("image", { required: true })}
                                onChange={handleImageInput}
                            />
                        </div>
                        <div>
                            {previewURL && (
                                <img
                                    src={previewURL}
                                    alt="Preview"
                                    className="w-full h-84 object-cover mt-4 rounded-lg"
                                />
                            )}
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
                    labelClassName="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                    selectClassName="px-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    {...register("category", { required: true })}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="w-full"
                    labelClassName="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                    selectClassName="px-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    {...register("status", { required: true })}
                />
                <button
                    type="submit"
                    className="mt-4 cursor-pointer px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Publish Blog
                </button>
            </div>
        </form>
    );
};

export default BlogForm;
