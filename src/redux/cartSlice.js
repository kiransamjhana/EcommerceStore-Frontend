import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      if (state.cart.length === 0 && payload._id === undefined) {
        return;
      }

      const isItemExist = state.cart.filter((item) => item._id === payload._id);

      if (isItemExist.length > 0) {
        const indexOfItemToBeRemoved = state.cart.findIndex(
          (item) => item._id === payload._id
        );
        state.cart.splice(indexOfItemToBeRemoved, 1, payload);
        return;
      }
      state.cart = [...state.cart, payload];
    },

    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item._id !== payload);
    },
    clearCart: (state) => {
      state.cart = []; // Set the cart array to an empty array
    },
    resetCart: (state, { payload }) => {
      state.cart = payload;
    },
  },
});

const { reducer, actions } = cartSlice;
export const { setCart, removeItemFromCart, clearCart, resetCart } = actions;

export default reducer;
