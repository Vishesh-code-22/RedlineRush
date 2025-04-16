import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import authSlice from "./authSlice";
import utilitySlice from "./utilitySlice";
import otherSlice from "./otherSlice";

const store = configureStore({
    reducer: {
        blog: blogSlice,
        auth: authSlice,
        utility: utilitySlice,
        other: otherSlice,
    },
});

export default store;
