import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
import { useSelector } from "react-redux";

const RTE = ({ label, name, control, defaultValue = "" }) => {
    const [isEditorReady, setIsEditorReady] = useState(false);
    const isDarkMode = useSelector((state) => state.utility.isDarkMode);

    return (
        <div className="w-full relative">
            {label && (
                <label className="inline-block mb-1 pl-1 text-md font-semibold">
                    {label}
                </label>
            )}

            {!isEditorReady && (
                <div className="flex items-center justify-center h-[500px] caret-transparent">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={conf.tinyMceKey}
                        initialValue={defaultValue}
                        onInit={() => setIsEditorReady(true)}
                        init={{
                            height: 500,
                            menubar: true,
                            skin: isDarkMode ? "oxide-dark" : "oxide",
                            content_css: isDarkMode ? "dark" : "default",
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
};

export default RTE;
