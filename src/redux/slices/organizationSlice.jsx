import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "home",
  selectedOrganization: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    clearActiveTab: (state) => {
      state.activeTab = "home";
    },
    setSelectedOrganization: (state, action) => {
      state.selectedOrganization = action.payload;
    },
    clearSelectedOrganization: (state) => {
      state.selectedOrganization = null;
    },
    updateOrganizationField: (state, action) => {
      const { field, value } = action.payload;
      if (state.selectedOrganization) {
        state.selectedOrganization[field] = value;
      }
    },
  },
});

export const {
  setActiveTab,
  clearActiveTab,
  setSelectedOrganization,
  clearSelectedOrganization,
  updateOrganizationField,
} = organizationSlice.actions;

export default organizationSlice.reducer;