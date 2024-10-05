import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "@/lib/services/ProductService";
import {
  GetUserProductsResponse,
  Product,
  ProductAdminResponse,
} from "@/types/Product.interface";
import { HttpError } from "@/types/HttpError.interface";
import toast from "react-hot-toast";
import { AdminProduct } from "../../types/Product.interface";

interface ProductState {
  isLoading: boolean;
  products: (Product | AdminProduct)[];
  totalPages: number;
  totalProducts: number;
  error: string | null;
  searchFilter: string;
  priceRange: number[];
  selectedSeller: number | null;
}

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  totalProducts: 0,
  isLoading: false,
  error: null,
  searchFilter: "",
  priceRange: [0, 10000],
  selectedSeller: null,
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
      return response;
    } catch (err) {
      const productError = err as HttpError;
      toast.error(productError.message);
      return rejectWithValue(productError.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (
    { limit, offset }: { limit: number; offset: number },
    { rejectWithValue }
  ) => {
    try {
      const response: GetUserProductsResponse =
        await productService.getAllProducts(limit, offset);
      return response;
    } catch (err) {
      const productError = err as HttpError;
      toast.error(productError.message);
      return rejectWithValue(productError.message);
    }
  }
);

export const getAdminProducts = createAsyncThunk(
  "product/admin/getAllProducts",
  async (
    { limit, offset }: { limit: number; offset: number },
    { rejectWithValue }
  ) => {
    try {
      const response: ProductAdminResponse =
        await productService.getAdminProducts(limit, offset);
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
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
    },
    setSelectedSeller: (state, action: PayloadAction<number | null>) => {
      state.selectedSeller = action.payload;
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
      (state, action: PayloadAction<GetUserProductsResponse>) => {
        state.isLoading = false;
        state.totalPages = action.payload.result.totalPages;
        state.totalProducts = action.payload.result.totalProducts;
        state.products = action.payload.result.products;
      }
    );
    builder.addCase(getAllProducts.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getAdminProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAdminProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;

        state.products = action.payload;
      }
    );
    builder.addCase(getAdminProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  setProducts,
  setSearchFilter,
  setPriceRange,
  setSelectedSeller,
} = productSlice.actions;

export default productSlice.reducer;
