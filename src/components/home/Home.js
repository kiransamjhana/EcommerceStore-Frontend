import React, { useEffect } from "react";
import { Header } from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../actions/proudctAction";
import { ProductCard } from "../product/ProductCard";
import { Footer } from "../layout/Footer";
import HeroSection from "../top section/HeroSection";

export const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productInfo);
  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);
  return (
    <>
      <div className="bg-transparent">
        <div className="mt-2">
          <Header />
        </div>

        <section>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Shop now
              </h2>
            </header>

            <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </ul>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};
