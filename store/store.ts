import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productReducer from "./slices/ProductSlice";
import usersReducer from "./slices/usersSlice";
import storage from "redux-persist/lib/storage"; // Esto utiliza localStorage por defecto
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/AuthSlice";
import CartReducer from "./slices/CartSlice";

const persistConfig = {
  key: "store",
  storage, // Usa localStorage para persistir
  whitelist: ["auth", "cart"], // Solo persiste el slice de autenticación
};

const rootReducer = combineReducers({
  product: productReducer,
  users: usersReducer,
  auth: authReducer,
  cart: CartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Evita los errores de serialización causados por redux-persist
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
