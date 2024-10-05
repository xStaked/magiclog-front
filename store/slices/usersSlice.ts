import { UserService } from "@/lib/services/UserService";
import { HttpError } from "@/types/HttpError.interface";
import { User } from "@/types/Users.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  sellers: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  sellers: [],
  isLoading: false,
  error: null,
};

const usersService = new UserService();

// AsyncThunk para obtener los sellers
export const getSellers = createAsyncThunk(
  "users/getSellers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersService.getSellers();
      console.log("response seller", response);
      return response.result; // Asume que el resultado está en "result"
    } catch (err) {
      const userError = err as HttpError;
      return rejectWithValue(userError.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Estado cuando comienza la llamada a getSellers
      .addCase(getSellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Estado cuando la llamada a getSellers se completa con éxito
      .addCase(getSellers.fulfilled, (state, action) => {
        state.sellers = action.payload; // Asigna los sellers obtenidos
        state.isLoading = false;
      })
      // Estado cuando hay un error en la llamada a getSellers
      .addCase(getSellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Exportar el reducer para integrarlo en el store
export default userSlice.reducer;
