// src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import announcementReducer from "../slices/announcementSlice";
import feeReducer from "../slices/feeSlice";
import roomReducer from "../slices/roomSlice";
import suggestionBoxReducer from "../slices/suggestionSlice";
import studentReducer from "../slices/studentSlice";
import dashboardReducer from "../slices/dashboardSlice";
import authReducer from "../slices/authSlice";
import resetReducer, { resetStore } from "../slices/resetSlice";
import resetStoreMiddleware from "../middleware/resetStore";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["reset"], // Do not persist the reset slice
};

const appReducer = combineReducers({
  announcements: announcementReducer,
  fees: feeReducer,
  rooms: roomReducer,
  suggestions: suggestionBoxReducer,
  students: studentReducer,
  dashboard: dashboardReducer,
  auth: authReducer,
  reset: resetReducer,
});

const rootReducer = (state, action) => {
  if (action.type === resetStore().type) {
    // Reset the state except for the auth slice
    state = {
      auth: state.auth,
      reset: state.reset,
    };
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(resetStoreMiddleware),
});

export const persistor = persistStore(store);
