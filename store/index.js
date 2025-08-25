import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from './slices/productSlice';
import CartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        products: ProductsReducer,
        cartItems: CartReducer
    },
});

export default store; 