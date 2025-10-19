import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userSlice";
import settingsReducer from "./slices/settingsSlice";
import organizationReducer from "./slices/organizationSlice";
import organizationsReducer from "./slices/organizationsSlice";
import invitationReducer from "./slices/invitationSlice";
import projectsReducer from "./slices/projectSlice";
import boardsReducer from "./slices/BoardsSlice";

// configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "organizations"],
};

// combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  organization: organizationReducer,
  organizations: organizationsReducer,
  invitation: invitationReducer,
  projects: projectsReducer,
  boards: boardsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
