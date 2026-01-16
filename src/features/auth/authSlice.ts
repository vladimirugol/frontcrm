// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { login, register } from "./authThunks";

interface AuthState {
  isAuthenticated: boolean;
  successMessage: string | null;
  error: string | null;
}

const initialState : AuthState = {
    isAuthenticated: false,
    successMessage: null,
    error: null
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload ?? "Login failed";
      })

      .addCase(register.pending, (state) => {
        state.error = null;
        state.successMessage = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
        state.isAuthenticated = false;
        state.successMessage = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const {
  logout,
  clearAuthError,
  clearSuccessMessage,
} = authSlice.actions;

export default authSlice.reducer;
