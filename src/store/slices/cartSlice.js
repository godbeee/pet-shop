import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      state.totalPrice += action.payload.quantity * action.payload.price;
    },
    removeFromCart(state, action) {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        state.cartItems = state.cartItems.filter((ci) => ci._id !== item._id);
      } else {
        item.quantity--;
      }
      state.totalPrice -= item.price;
    },
    deleteItem(state, action) {
      const item = state.cartItems.find((item) => item._id === action.payload);
      state.totalPrice = state.totalPrice - item.price * item.quantity;
      state.cartItems = state.cartItems.filter((ci) => ci._id !== item._id);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
    // onInitialCart(state, action) {
    //   state.cartItems = action.payload.cart;
    //   state.totalPrice = action.payload.totalPrice;
    // },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
