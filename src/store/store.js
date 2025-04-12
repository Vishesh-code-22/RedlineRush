import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import authSlice from "./authSlice";
import utilitySlice from "./utilitySlice";

const store = configureStore({
    reducer: {
        blog: blogSlice,
        auth: authSlice,
        utility: utilitySlice,
    },
});

export default store;
