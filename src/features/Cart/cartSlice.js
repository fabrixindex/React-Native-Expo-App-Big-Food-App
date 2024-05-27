import { createSlice } from "@reduxjs/toolkit";

const calculateTotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: "userIdLogged",
            updatedAt: new Date().toLocaleString(),
            total: null,
            items: [],
            createdAt: null,
        },
    },
    reducers: {
        addCartItem: (state, { payload }) => {
            const productRepeated = state.value.items.find((item) => item.id === payload.id);

            if (productRepeated) {
                productRepeated.quantity += payload.quantity;
            } else {
                state.value.items.push(payload);
            }

            state.value.total = calculateTotal(state.value.items);
            state.value.updatedAt = new Date().toLocaleString();
        },
        removeCartItem: (state, { payload }) => {
            state.value.items = state.value.items.filter((item) => item.id !== payload.id);
            state.value.total = calculateTotal(state.value.items);
            state.value.updatedAt = new Date().toLocaleString();
        },
        clearCart: (state) => {
            state.value.items = [];
            state.value.total = 0;
            state.value.updatedAt = new Date().toLocaleString();
            state.value.createdAt = null;
        },
        confirmOrder: (state) => {
            state.value.createdAt = new Date().toISOString();
        },
    },
});

export const { addCartItem, removeCartItem, clearCart, confirmOrder } = cartSlice.actions;
export default cartSlice.reducer;
