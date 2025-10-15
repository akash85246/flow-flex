import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [], // use empty array instead of null for easier operations
  selectedProject: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    clearProjects: (state) => {
      state.projects = [];
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
});

export const {
  setProjects,
  clearProjects,
  addProject,
  removeProject,
  setSelectedProject,
  clearSelectedProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;