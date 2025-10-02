
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userSlice";
import settingsReducer from "./slices/settingsSlice";

// configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], 
};

// combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
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