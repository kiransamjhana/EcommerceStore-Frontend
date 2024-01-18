import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../layout/Header";

import { PaymentForm } from "./PaymentForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Ntj4VBmvWylAIGlyjJvI0uOgnUyJSkDwmPrtOgcHjw54a7yJbK9Sh0ecfyfNjrQSGPXLT3JRmVFMmFhFy86VpCO00QqPBwfy4"
);
export const CheckOt = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartInfo);

  const { users } = useSelector((state) => state.userInfo);
  const totalAmount = cart.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base"></div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>

          <div className="mt-8 space-y-3 rounded-lg border bg-green px-2 py-4 sm:px-6">
            {cart?.map((item, i) => {
              return (
                <div
                  key={item._id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={
                      process.env.REACT_APP_ROOTSERVER +
                      item.thumbnail?.slice(6)
                    }
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.name}</span>

                    <p className="text-lg font-bold">${item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-4 pt-8 mt-1">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};
