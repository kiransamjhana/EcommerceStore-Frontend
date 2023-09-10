import React from "react";
import { Header } from "../layout/Header";
import { useSelector } from "react-redux";

export const Home = () => {
  const { products } = useSelector((state) => state.productInfo);

  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((item, i) => {
              console.log(item);
              return (
                <div key={i} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={
                        process.env.REACT_APP_ROOTSERVER +
                        item?.thumbnail?.slice(6)
                      }
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.title}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.slug}
                    </h2>
                    <p className="mt-1">{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
