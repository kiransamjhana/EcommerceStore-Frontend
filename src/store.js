import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../src/redux/productSlice";
import catReducer from "../src/redux/categorySlice";
import cartReducer from "../src/redux/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "cartItem",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    productInfo: productReducer,
    catInfo: catReducer,
    cartInfo: persistedReducer,
  },
});

let persistor = persistStore(store);
export { persistor };
