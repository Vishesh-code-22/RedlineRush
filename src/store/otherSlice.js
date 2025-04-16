import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    galleryData: [],
};

const otherSlice = createSlice({
    name: "other",
    initialState,
    reducers: {
        setGalleryData: (state, action) => {
            const exists = state.galleryData.some(
                (item) => item.id === action.payload.id
            );
            if (!exists) {
                state.galleryData.push(action.payload);
            }
        },
    },
});

export const { setGalleryData } = otherSlice.actions;

export default otherSlice.reducer;
