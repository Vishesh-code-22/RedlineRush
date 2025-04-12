import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    showNav: true,
};

const utilitySlice = createSlice({
    name: "utility",
    initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setShowNav(state, action) {
            state.showNav = action.payload;
        },
    },
});

export const { setIsLoading, setShowNav } = utilitySlice.actions;

export default utilitySlice.reducer;
