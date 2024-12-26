import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        user: null
    },
    reducers: {
        setUserDetails: (state, payload) => {
            state.user = payload.payload;
        }
    }
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;