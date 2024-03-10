import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLinkClickHandler, useParams } from "react-router-dom";
import { getProductById } from "../../helper/axios";
import { Header } from "../../components/layout/Header";
import { Col, Row } from "react-bootstrap";
import { setCart } from "../../redux/cartSlice";
import Quantity from "../../components/cart/Quantity";
import { toast } from "react-toastify";

export const ProductLanding = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  console.log(product);
  useEffect(() => {
    // call data
    // set to state
    async function getData() {
      const { products } = await getProductById(_id);
      if (products) {
        setProduct(products);
      }
    }
    getData();
  }, [_id]);
  const { qty } = product;
  console.log(qty);
  const handleOnClick = () => {
    dispatch(setCart({ ...product, quantity }));
    toast(" Item Added To Cart");
  };
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    quantity < qty ? setQuantity(quantity + 1) : setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Header />

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-column">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
              src={
                process.env.REACT_APP_ROOTSERVER + product.thumbnail?.slice(6)
              }
            />

            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {product.name}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Description
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Reviews
                </a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                  Details
                </a>
              </div>
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <p className="leading-relaxed mb-4">{product.description}</p>
            </div>
            <div className=" d-flex flex-column  justify-items-center gap-2">
              <div className="d-flex align-center">
                {" "}
                <Quantity
                  quantity={quantity}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  qty={qty}
                />
              </div>
              <div className="d-flex ">
                {" "}
                <button
                  className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={handleOnClick}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
