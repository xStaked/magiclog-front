import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productReducer from './slices/ProductSlice';

export const store = configureStore({
  reducer: {
    // example: exampleReducer,
    product: productReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
