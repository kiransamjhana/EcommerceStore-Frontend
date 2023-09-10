import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../src/redux/productSlice";
import catReducer from "../src/redux/categorySlice";
export const store = configureStore({
  reducer: {
    productInfo: productReducer,
    catInfo: catReducer,
  },
});
