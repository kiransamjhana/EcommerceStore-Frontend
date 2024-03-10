import { Rss } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
console.log(
  "Image URL:",
  process.env.REACT_APP_ROOTSERVER + item.thumbnail?.slice(6)
);
export const ProductCard = ({ item }) => {
  return (
    <li>
      <Link
        to={`/product/${item.slug}/${item._id}`}
        className="block overflow-hidden group"
      >
        <img
          src={process.env.REACT_APP_ROOTSERVER + item?.thumbnail?.slice(6)}
          alt="img"
          width="150px"
        />

        <div className="relative pt-3 bg-white">
          <h3 className="text-xs text-gray-700 group-hover group-hover:underline-offset-4">
            {item.name}
          </h3>

          <p className="mt-2">
            <span className="sr-only">{item.name} </span>

            <span className="tracking-wider text-gray-900">${item.price}</span>
          </p>
        </div>
      </Link>
    </li>
  );
};
