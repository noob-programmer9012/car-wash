import { createSlice, configureStore } from "@reduxjs/toolkit";
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

export const persistConf = {
  key: "root",
  version: 1,
  storage,
};

const authSlice = createSlice({
  name: "auth",
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.email = action.payload.email;
    },
  },
});

const persistedReducer = persistReducer(persistConf, authSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer,
  // preloadedState: { token: undefined, user: undefined },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}); // you can also use { auth: { reducer: authSlice.reducer }, other: { reducer: otherSlice.reducer } } for multiple slices
export const persistor = persistStore(store);
export const authActions = authSlice.actions;
