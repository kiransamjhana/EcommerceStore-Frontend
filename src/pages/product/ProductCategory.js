import React, { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Home } from "../../components/home/Home";

import { Link, useParams } from "react-router-dom";
import { getProductByCategoryId } from "../../helper/axios";
import { ProductLanding } from "./product";
import { ProductCard } from "../../components/product/ProductCard";

export const ProductCategory = () => {
  const { _id } = useParams();
  const [productDt, setProductDt] = useState([]);
  console.log(productDt);
  useEffect(() => {
    async function getData() {
      const { product } = await getProductByCategoryId({ obj: _id });

      setProductDt(product);
    }
    getData();
  }, [_id]);
  return (
    <div>
      <Header />
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Product Collection
            </h2>

            <p className="max-w-md mt-4 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {productDt.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
