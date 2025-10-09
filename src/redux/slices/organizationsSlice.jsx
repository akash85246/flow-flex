import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Organizations: null,
};

const organizationsSlice = createSlice({
    name: "organizations",
    initialState,
    reducers: {
        setOrganizations: (state, action) => {
            state.Organizations = action.payload;
        },
        clearOrganizations: (state) => {
            state.Organizations = null;
        },
    },
})

export const {
  setOrganizations,
  clearOrganizations,
} = organizationsSlice.actions;

export default organizationsSlice.reducer;