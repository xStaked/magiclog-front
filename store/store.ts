import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productReducer from "./slices/ProductSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    // example: exampleReducer,
    product: productReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
