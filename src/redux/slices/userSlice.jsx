import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  profile_picture: null,
  email: null,
  last_online: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.profile_picture = action.payload.profile_picture;
      state.email = action.payload.email;
      state.last_online = new Date(action.payload.last_online).toLocaleString();
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.profile_picture = null;
      state.email = null;
      state.last_online = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;