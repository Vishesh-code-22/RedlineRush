import { useDispatch } from "react-redux";
import { Footer, Navbar } from "./components";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "./appwrite/authService";
import { login, logout } from "./store/authSlice";

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, [dispatch]);

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
