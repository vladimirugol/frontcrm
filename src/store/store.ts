import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dealReducer from "../features/auth/dealSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deals: dealReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;