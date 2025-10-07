import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: null,
  last_name: null,
  avatar: null,
  email: null,
  slug: null,
  timezone: null,
  status: "offline",
  theme_preference: "light",
  created_at: null,
  updated_at: null,
  last_online: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.slug = action.payload.slug;
      state.timezone = action.payload.timezone;
      state.status = action.payload.status;
      state.theme_preference = action.payload.theme_preference;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
      state.last_online = action.payload.last_online;
    },
    clearUser: (state) => {
      state.first_name = null;
      state.last_name = null;
      state.avatar = null;
      state.email = null;
      state.slug = null;
      state.timezone = null;
      state.status = "offline";
      state.theme_preference = "light";
      state.created_at = null;
      state.updated_at = null;
      state.last_online = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
