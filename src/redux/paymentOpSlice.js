import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payOptions: [],
};
const payOptionsSlice = createSlice({
  name: "payOption",
  initialState,
  reducers: {
    setPayOptions: (state, { payload }) => {
      if (state.payOptions.length === 0 && payload.length === 0) {
        return;
      }
      state.payOptions = payload;
    },
  },
});

const { reducer, actions } = payOptionsSlice;
export const { setPayOptions } = actions;
export default reducer;
