import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./slices/productSlice";
import CartReducer from "./slices/cartSlice";
import snackbarSimpleSlice from "./slices/snackbarSimpleSlice";
import { authApi } from './authApi';

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cartItems: CartReducer,
     snackbar: snackbarSimpleSlice,
    [authApi.reducerPath]: authApi.reducer,
  },

});

export default store;
