import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "@/lib/services/ProductService";
import { GetUserProductsResponse, Product } from "@/types/Product.interface";
import { HttpError } from "@/types/HttpError.interface";
import toast from "react-hot-toast";

interface ProductState {
  isLoading: boolean;
  products: Product[];
  error: string | null;
  searchFilter: string;
  priceRange: number[];
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
  searchFilter: "",
  priceRange: [0, 10000],
};

const productService = new ProductService();

// Thunks para las operaciones asíncronas
export const hanldeCreateProduct = createAsyncThunk(
  "product/handleCreateProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await productService.addProduct(product);
      toast.success("Successfully created product");
      return response;
    } catch (err) {
      const productError = err as HttpError;
      toast.error(productError.message);
      return rejectWithValue(productError.message);
    }
  }
);

export const getUserProducts = createAsyncThunk(
  "product/getUserProducts",
  async (
    { limit, offset }: { limit: number; offset: number },
    { rejectWithValue }
  ) => {
    try {
      const response: GetUserProductsResponse =
        await productService.getSellerProducts(limit, offset);
      return response.result;
    } catch (err) {
      const productError = err as HttpError;
      toast.error(productError.message);
      return rejectWithValue(productError.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "http://localhost:3001/product/getAllProducts",
  async (
    { limit, offset }: { limit: number; offset: number },
    { rejectWithValue }
  ) => {
    try {
      const response: GetUserProductsResponse =
        await productService.getAllProducts(limit, offset);
      return response.result;
    } catch (err) {
      const productError = err as HttpError;
      toast.error(productError.message);
      return rejectWithValue(productError.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Crear producto
    builder.addCase(hanldeCreateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(hanldeCreateProduct.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(hanldeCreateProduct.rejected, (state) => {
      state.isLoading = false;
    });

    // Obtener productos del usuario
    builder.addCase(getUserProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getUserProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(getUserProducts.rejected, (state) => {
      state.isLoading = false;
    });

    // Obtener todos los productos
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.products = action.payload;
      }
    );
    builder.addCase(getAllProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setSearchFilter, setPriceRange } = productSlice.actions;

export default productSlice.reducer;
