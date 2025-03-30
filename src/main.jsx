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
} from "./pages";
import { Provider } from "react-redux";
import store from "./store/store.js";

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
