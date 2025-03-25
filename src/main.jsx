import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Category from "./pages/Category.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/blog/:id",
                element: <Blog />,
            },
            {
                path: "/category/:category",
                element: <Category />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/about",
                element: <About />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
