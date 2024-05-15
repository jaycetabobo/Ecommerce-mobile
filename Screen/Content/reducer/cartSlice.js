import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        CART: (state, action) => {
            const { productID, quantity, size } = action.payload;

            // Find the existing item in the cart
            const existingItem = state.cart.find((item) => item.productID === productID);

            if (existingItem) {
                // Update quantity if item already exists
                existingItem.quantity += quantity;
            } else {
                // Add new item to the cart
                state.cart.push({ productID, quantity, size });
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { CART } = cartSlice.actions

export default cartSlice.reducer