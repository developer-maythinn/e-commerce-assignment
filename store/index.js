import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './slices/productSlice';
import CartReducer from './slices/cartSlice';
import { authApi } from './authApi';
import { uploadApi } from './uploadApi';
import snackbarSliceReducer from "./slices/snackBarSlice";

const store = configureStore({
    reducer: {
        products: ProductsReducer,
        cartItems: CartReducer,
        [authApi.reducerPath]: authApi.reducer,
        [uploadApi.reducerPath]: uploadApi.reducer,
        snackbar: snackbarSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, uploadApi.middleware),
});

export default store; 