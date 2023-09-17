import "./App.css";
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
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatsAction());
  }, [dispatch]);

  return (
    <div className="font-bold text-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug?/:_id?" element={<ProductCategory />} />
        <Route path="/product/:slug/:_id?" element={<ProductLanding />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
