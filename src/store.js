import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../src/redux/productSlice";
import catReducer from "../src/redux/categorySlice";
import cartReducer from "../src/redux/cartSlice";
import paymentReducer from "../src/redux/paymentOpSlice";
import userReducer from "../src/redux/userSlice";
import system from "../src/redux/systemSlice";
import orderReducer from "../src/redux/orderSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "cartItem",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    systemInfo: system,
    productInfo: productReducer,
    catInfo: catReducer,
    cartInfo: persistedReducer,
    paymentInfo: paymentReducer,
    userInfo: userReducer,
    orderInfo: orderReducer,
  },
});

let persistor = persistStore(store);
export { persistor };
