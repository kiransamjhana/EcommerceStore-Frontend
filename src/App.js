import "./App.css";

import { Home } from "./components/home/Home";
import { ToastContainer } from "react-toastify";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCatsAction } from "./actions/categoryAction";

import {
  getProductByCategoryIdAction,
  getProductsAction,
} from "./actions/proudctAction";
import { ProductCategory } from "./pages/product/ProductCategory";
import { Route, Routes } from "react-router-dom";
import { ProductLanding } from "./pages/product/product";
import { CartPage } from "./pages/cart/CartPage";
import { CheckOt } from "./components/checkout/CheckOt";
import { getPayOpsAction } from "./actions/payOpsonAction";
import { UserSignUp } from "./pages/user/UserSignUp";
import { postNewUserAction } from "./actions/userAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatsAction());
    dispatch(getPayOpsAction());
  }, [dispatch]);

  return (
    <div className="font-bold text-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserSignUp />} />
        <Route path="/category/:slug?/:_id?" element={<ProductCategory />} />
        <Route path="/product/:slug/:_id?" element={<ProductLanding />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkOut" element={<CheckOt />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
