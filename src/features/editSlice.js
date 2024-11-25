import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editItem: null,
  }

const editSlice = createSlice({
    name: 'edit_slice',
    initialState,
    reducers: {
        setEdit: (state, action) => {
            state.editItem = action.payload.key;
        },
        clearEdit: (state) => {
            state.editItem = null;
        }
    }
});

export const { setEdit, clearEdit } = editSlice.actions;

export default editSlice.reducer;