import React, { useEffect } from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAction } from "../../actions/orderAction";

export const OrderComp = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);
  console.log(order);
  const orderNumeber = localStorage.getItem("orderNumber");

  useEffect(() => {
    dispatch(getOrderAction());

    // dispatch(autoLogin());
  }, [dispatch]);

  return (
    <div>
      <Header />

      <div className="text-center mb-8 mt-5">
        <h1 className="text-4xl font-bold text-black mb-4">
          Thank You for Shopping!
        </h1>
        <p className="text-lg text-gray-700">
          Your order has been successfully placed.
        </p>
      </div>

      <div className="bg-indigo-100 p-4 rounded-lg text-center mb-6">
        <p className="text-lg font-semibold text-indigo-700 mb-2">
          Order Number
        </p>
        <p className="text-xl text-indigo-900">{orderNumeber} </p>
      </div>

      <Footer />
    </div>
  );
};
