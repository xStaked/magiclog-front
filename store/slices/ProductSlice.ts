import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "@/lib/services/ProductService";
import { GetUserProductsResponse, Product } from "@/types/Product.interface";
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
  selectedSellers: number[];
}

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  totalProducts: 0,
  isLoading: false,
  error: null,
  searchFilter: "",
  priceRange: [0, 10000],
  selectedSellers: [],
};

const productService = new ProductService();

export const createProduct = createAsyncThunk(
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
    { offset, limit }: { limit: number; offset: number },
    { rejectWithValue }
  ) => {
    try {
      const response: GetUserProductsResponse =
        await productService.getSellerProducts(offset, limit);
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
    { offset, limit }: { limit: number; offset: number },
    { rejectWithValue }
  ) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      const response: GetUserProductsResponse =
        await productService.getAllProducts(offset, limit);
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
    { offset, limit }: { limit: number; offset: number },
    { rejectWithValue }
  ) => {
    try {
      const response: GetUserProductsResponse =
        await productService.getAdminProducts(offset, limit);
      return response;
    } catch (err) {
      const productError = err as HttpError;
      toast.error(productError.message);
      return rejectWithValue(productError.message);
    }
  }
);

export const getMatchProducts = createAsyncThunk(
  "product/match",
  async ({ query }: { query: string }, { rejectWithValue }) => {
    try {
      const response: GetUserProductsResponse =
        await productService.getMatchProdutcs(query);
      return response;
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
    setSelectedSeller: (state, action: PayloadAction<number>) => {
      const sellerId = action.payload;

      if (state.selectedSellers.includes(sellerId)) {
        state.selectedSellers = state.selectedSellers.filter(
          (id) => id !== sellerId
        );
      } else {
        state.selectedSellers.push(sellerId);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getUserProducts.fulfilled,
      (state, action: PayloadAction<GetUserProductsResponse>) => {
        state.isLoading = false;
        state.totalPages = action.payload.result.totalPages;
        state.totalProducts = action.payload.result.totalProducts;
        state.products = action.payload.result.products;
      }
    );
    builder.addCase(getUserProducts.rejected, (state) => {
      state.isLoading = false;
    });

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
      (state, action: PayloadAction<GetUserProductsResponse>) => {
        state.isLoading = false;
        console.log("payload", action.payload);
        state.totalPages = action.payload.result.totalPages;
        state.totalProducts = action.payload.result.totalProducts;
        state.products = action.payload.result.products;
      }
    );

    builder.addCase(getMatchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getMatchProducts.fulfilled,
      (state, action: PayloadAction<GetUserProductsResponse>) => {
        state.isLoading = false;
        console.log("payload", action.payload);
        state.totalPages = action.payload.result.totalPages;
        state.totalProducts = action.payload.result.totalProducts;
        state.products = action.payload.result.products;
      }
    );
    builder.addCase(getMatchProducts.rejected, (state) => {
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
