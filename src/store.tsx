import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";

export const store = configureStore({
  reducer: usersSlice,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
