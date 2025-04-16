import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    userData: null,
    role: null,
    avatar: null,
    history: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.status = true;
            state.userData = action.payload.userData;
            state.role = action.payload.role;
        },
        logout(state) {
            state.status = false;
            state.userData = null;
            state.role = null;
            state.history = null;
        },
        addAvatar(state, action) {
            state.avatar = action.payload;
        },

        addHistory(state, action) {
            state.history = action.payload;
        },
    },
});

export const { login, logout, addAvatar, addHistory } = authSlice.actions;

export default authSlice.reducer;
