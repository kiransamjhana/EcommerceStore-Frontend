import React, { useEffect } from "react";
import { Header } from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../actions/proudctAction";
import { ProductCard } from "../product/ProductCard";

export const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productInfo);
  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);
  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((item, i) => (
              <ProductCard item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
