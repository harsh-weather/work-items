import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    refresh: false,
}

const refreshSlice = createSlice({
    name: 'refresh',
    initialState,
    reducers: {
        triggerRefresh: ((state) => {
            state.refresh = !state.refresh;
        })
    }
})

export const {triggerRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;