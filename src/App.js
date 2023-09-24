import "./App.css";
{
  /* The following line can be included in your src/index.js or App.js file */
}
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/home/Home";

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
    </div>
  );
}

export default App;
