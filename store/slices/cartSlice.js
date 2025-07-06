import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cartItems",
    initialState: {
        cartItems: [],
        open: false,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        toggleCart: (state, action) => {
            state.open = action.payload;
        },
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
                }
            }
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});
export const totalCount = (state) => {
    return state.cartItems?.cartItems?.reduce((total, item) => total + item.quantity, 0)
}
export const {
    addToCart,
    toggleCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
} = CartSlice.actions;
export default CartSlice.reducer;
