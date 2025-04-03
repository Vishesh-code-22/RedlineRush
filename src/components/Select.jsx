import React, { useId } from "react";

const Select = (
    { options, label, className, labelClassName, selectClassName, ...props },
    ref
) => {
    const id = useId();
    return (
        <div className={`flex flex-col w-full ${className || ""}`}>
            {label && (
                <label
                    htmlFor={id}
                    className={`text-sm font-medium text-gray-700 mb-2 ${
                        labelClassName || ""
                    }`}
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white bg-no-repeat cursor-pointer ${
                    selectClassName || ""
                }`}
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
                    backgroundPosition: "right 0.5rem center",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: "2.5rem",
                }}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default React.forwardRef(Select);
