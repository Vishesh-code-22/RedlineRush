import { useDispatch, useSelector } from "react-redux";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "./appwrite/authService";
import { addAvatar, addHistory, login, logout } from "./store/authSlice";
import dataService from "./appwrite/dataService";
import { addBlog } from "./store/blogSlice";
import { setGalleryData } from "./store/otherSlice";

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
                    const userMetaData = await authService.getUserMetaData(
                        userData.$id
                    );

                    dispatch(login({ userData, role: userMetaData.role }));
                    dispatch(addHistory(userMetaData.history));
                    dispatch(addAvatar(userMetaData.avatar));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Auth error:", error);
                dispatch(logout());
            } finally {
                // setLoading(false);
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
                setLoading(true);
                const posts = await dataService.getPosts();
                const images = await dataService.getImages();
                console.log(posts);

                if (posts) {
                    posts.documents.forEach((post) => {
                        dispatch(addBlog(post));
                    });
                }

                if (images) {
                    images.documents.forEach((image) => {
                        const imageUrl = dataService.getArticleImagePreview(
                            image.$id
                        );
                        dispatch(
                            setGalleryData({
                                id: image.$id,
                                imageUrl,
                                owner: image.owner,
                            })
                        );
                    });
                }
            } catch (error) {
                console.error("Blog fetch error:", error);
            } finally {
                setLoading(false);
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
