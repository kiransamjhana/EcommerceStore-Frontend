import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, { payload }) => {
      if (state.products.length === 0 && payload.length === 0) {
        return;
      }
      state.products = payload;
    },
  },
});

const { reducer, actions } = productsSlice;
export const { setProduct } = actions;
export default reducer;
