import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        blog: blogSlice,
        auth: authSlice,
    },
});

export default store;
