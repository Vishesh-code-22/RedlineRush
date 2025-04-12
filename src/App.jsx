import { useDispatch, useSelector } from "react-redux";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";
import dataService from "./appwrite/dataService";
import { addBlog } from "./store/blogSlice";

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const isLoading = useSelector((state) => state.utility.isLoading);

    // Handle authentication state
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    const role = await authService.getUserRole(userData.$id);
                    dispatch(login({ userData, role }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Auth error:", error);
                dispatch(logout());
            } finally {
                setLoading(false);
                // Reset scroll position to top after auth is loaded
                window.scrollTo(0, 0);
            }
        };

        checkAuth();
    }, [dispatch]);

    // Fetch blog posts separately from auth
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await dataService.getPosts();
                if (posts) {
                    posts.documents.forEach((post) => {
                        dispatch(addBlog(post));
                    });
                }
            } catch (error) {
                console.error("Blog fetch error:", error);
            }
        };

        fetchPosts();
    }, [dispatch]);

    return loading || isLoading ? (
        <div className="flex items-center justify-center min-h-screen caret-transparent">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    ) : (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
