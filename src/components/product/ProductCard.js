import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ item }) => {
  return (
    <Link to={"/product/" + item.slug + "/" + item._id}>
      <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={process.env.REACT_APP_ROOTSERVER + item?.thumbnail?.slice(6)}
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
    </Link>
  );
};
