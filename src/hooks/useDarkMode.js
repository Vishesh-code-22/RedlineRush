import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setIsDarkMode } from "../store/utilitySlice";

export default function useDarkMode() {
    const dispatch = useDispatch();
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme === "dark";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    const toggleDarkMode = useCallback(() => {
        setDarkMode((prev) => {
            const newMode = !prev;
            const html = document.documentElement;
            if (newMode) {
                html.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                html.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
            dispatch(setIsDarkMode(newMode));
            return newMode;
        });
    }, []);
    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [darkMode]);
    return { darkMode, toggleDarkMode };
}
