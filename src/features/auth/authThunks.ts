import { createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthData {
    email: string;
    password: string
}

export const login = createAsyncThunk<
  void,            
  AuthData,        
  { rejectValue: string } 
>(
  "auth/login",
  async (authData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData: { message?: string } = await response.json();
        return rejectWithValue(errorData.message ?? "Login failed");
      }
      return;
    } catch {
      return rejectWithValue("Login failed");
    }
  }
);

export const register = createAsyncThunk<
    string,
    AuthData,
    {rejectValue : string}
>(
    "auth/register",
    async (authData, { rejectWithValue }) => {
        try {
      const response = await fetch('/api/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
      });

      if (!response.ok) {
        try {
          const errorData: string[] | { message?: string } =
            await response.json();

          const errorMessage = Array.isArray(errorData)
            ? errorData.join(", ")
            : errorData.message ?? "Registration failed";

          return rejectWithValue(errorMessage);
        } catch {
          return rejectWithValue("Registration failed");
        }
      }

      return "Registered success, please login";
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : "Registration failed"
      );
    }
    }
)
