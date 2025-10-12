import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Projects: null,
  SelectedProject: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.Projects = action.payload;
    },
    clearProjects: (state) => {
      state.Projects = null;
    },
    setSelectedProject: (state, action) => {
      state.SelectedProject = action.payload;
    },
    clearSelectedProject: (state) => {
      state.SelectedProject = null;
    },
  },
});

export const {
  setProjects,
  clearProjects,
  setSelectedProject,
  clearSelectedProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
