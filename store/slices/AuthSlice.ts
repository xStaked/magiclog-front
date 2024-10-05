import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "@/lib/services/AuthService";
import { HttpError } from "@/types/HttpError.interface";
import { User } from "@/types/Auth.interface";
import toast from "react-hot-toast";

// Estado inicial
interface AuthState {
  user: null | User;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,
};

const authService = new AuthService();

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(
        credentials.email,
        credentials.password
      );
      toast.success("Successfully logged in!");

      return { token: response.token, user: response.user };
    } catch (err) {
      const authError = err as HttpError;
      toast.error(authError.message);
      return rejectWithValue(authError.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    credentials: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.register(
        credentials.username,
        credentials.email,
        credentials.password
      );
      toast.success("User has been register successfully!");

      return { token: response.token, user: response.user };
    } catch (err) {
      const authError = err as HttpError;
      toast.error(authError.message);
      return rejectWithValue(authError.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    openLoginDialog: (state) => {
      state.isLoginDialogOpen = true;
    },
    closeLoginDialog: (state) => {
      state.isLoginDialogOpen = false;
    },
    openRegisterDialog: (state) => {
      state.isRegisterDialogOpen = true;
    },
    closeRegisterDialog: (state) => {
      state.isRegisterDialogOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });
  },
});

export const {
  logout,
  openLoginDialog,
  closeLoginDialog,
  openRegisterDialog,
  closeRegisterDialog,
} = authSlice.actions;

export default authSlice.reducer;
