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
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {productDt?.map((item) => (
              <ProductCard item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
