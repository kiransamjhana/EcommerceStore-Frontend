import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, { payload }) => {
      if (state.order.length === 0 && payload.length === 0) {
        return;
      }
      state.order = payload;
    },
  },
});

const { reducer, actions } = orderSlice;
export const { setOrder } = actions;
export default reducer;
