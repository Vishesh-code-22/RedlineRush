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
    const blogData = useSelector((state) => state.blog.blogData);
    const status = useSelector((state) => state.auth.status);
    useEffect(() => {
        setLoading(true);
        if (status) {
            authService
                .getCurrentUser()
                .then((userData) => {
                    if (userData) {
                        authService.getUserRole(userData.$id).then((role) => {
                            dispatch(login({ userData, role }));
                            setLoading(false);
                        });
                    } else {
                        dispatch(logout());
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(logout());
                    setLoading(false);
                })
                .finally(() => setLoading(false));
        } else {
            dispatch(logout());
            setLoading(false);
        }

        dataService
            .getPosts()
            .then((posts) => {
                if (posts) {
                    posts.documents.forEach((post) => {
                        dispatch(addBlog(post));
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setLoading(false));
    }, [dispatch, blogData]);

    return !loading ? (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    ) : (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    );
}

export default App;
