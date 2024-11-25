import { configureStore } from "@reduxjs/toolkit";
import editReducer from "../features/editSlice";
import refreshReducer from "../features/refreshSlice";

export const store = configureStore({
    reducer: {
        edit: editReducer,
        refresh: refreshReducer,
    }
})