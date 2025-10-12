import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invitation: 0,
};

const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {
        setInvitation: (state, action) => {
            state.invitation = action.payload;
        },
        clearInvitation: (state) => {
            state.invitation = null;
        },
    },
})

export const {
  setInvitation,
  clearInvitation,
} = invitationSlice.actions;

export default invitationSlice.reducer;