import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    showNav: true,
    isDarkMode: false,
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
        setIsDarkMode(state, action) {
            state.isDarkMode = action.payload;
        },
    },
});

export const { setIsLoading, setShowNav, setIsDarkMode } = utilitySlice.actions;

export default utilitySlice.reducer;
