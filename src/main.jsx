import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import {
    Home,
    Blog,
    Category,
    Login,
    Signup,
    About,
    WriterSignup,
    WriterLogin,
    EditThisBlog,
    AddAvatar,
    YourBlogs,
    Gallary,
    Submit,
    Photo,
    History,
    ComingSoon,
} from "./pages";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AddBlog from "./pages/AddBlog.jsx";
import EditBlog from "./pages/EditBlog.jsx";
import DeleteBlog from "./pages/DeleteBlog.jsx";
import { AuthLayout } from "./components";

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
            {
                path: "/writer-signup",
                element: <WriterSignup />,
            },
            {
                path: "/writer-login",
                element: <WriterLogin />,
            },
            {
                path: "/add-blog",
                element: (
                    <AuthLayout authentication roleAuthor>
                        <AddBlog />
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-blog/",
                element: (
                    <AuthLayout authentication roleAuthor>
                        <EditBlog />
                    </AuthLayout>
                ),
            },
            {
                path: "/delete-blog",
                element: (
                    <AuthLayout authentication roleAuthor>
                        <DeleteBlog />
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-this-blog/:id",
                element: (
                    <AuthLayout authentication roleAuthor>
                        <EditThisBlog />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-avatar/:id",
                element: (
                    <AuthLayout authentication roleAuthor>
                        <AddAvatar />
                    </AuthLayout>
                ),
            },
            {
                path: "/your-blogs",
                element: (
                    <AuthLayout authentication roleAuthor>
                        <YourBlogs />
                    </AuthLayout>
                ),
            },
            {
                path: "/gallery",
                element: (
                    <AuthLayout authentication roleAuthor={false}>
                        <Gallary />
                    </AuthLayout>
                ),
            },
            {
                path: "/submit",
                element: (
                    <AuthLayout authentication roleAuthor={false}>
                        <Submit />
                    </AuthLayout>
                ),
            },
            {
                path: "/photo/:id",
                element: (
                    <AuthLayout authentication roleAuthor={false}>
                        <Photo />
                    </AuthLayout>
                ),
            },
            {
                path: "/history",
                element: (
                    <AuthLayout authentication roleAuthor={false}>
                        <History />
                    </AuthLayout>
                ),
            },
            {
                path: "/community",
                element: <ComingSoon />,
            },
            {
                path: "/read-list",
                element: <ComingSoon />,
            },
            {
                path: "/forum",
                element: <ComingSoon />,
            },
            {
                path: "/rides",
                element: <ComingSoon />,
            },
            {
                path: "/merch",
                element: <ComingSoon />,
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
