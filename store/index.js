import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./slices/productSlice";
import CartReducer from "./slices/cartSlice";
import snackbarSimpleSlice from "./slices/snackbarSimpleSlice";
import { authApi } from "./authApi";
import { uploadApi } from "./uploadApi";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cartItems: CartReducer,
    snackbar: snackbarSimpleSlice,
    [authApi.reducerPath]: authApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, uploadApi.middleware),
});

export default store;
