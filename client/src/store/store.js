import { configureStore } from "@reduxjs/toolkit";
import loadingSliceReducer from "./loadingSlice";
import userSliceReducer from "./userSlice";

const store = configureStore({
    reducer: {
        loader: loadingSliceReducer,
        user: userSliceReducer
    }
});

export default store;