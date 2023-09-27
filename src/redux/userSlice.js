import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      if (state.users.length === 0 && payload.length === 0) {
        return;
      }
      state.users = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser } = actions;
export default reducer;
