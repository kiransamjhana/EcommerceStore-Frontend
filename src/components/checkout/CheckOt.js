import React from "react";
import { useSelector } from "react-redux";
import { Payment } from "../../pages/payment/Payment";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Link } from "react-router-dom";

export const CheckOt = () => {
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
        <div className="mt-10 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Delivery information</p>

          <div className="">
            <label for="email" className="mt-2 mb-2 block text-sm font-medium">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="flName"
                name="name"
                value={users.fName}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </div>
            </div>

            <label for="email" className="mt-2 mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={users.email}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="kiran@yahoo.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </div>
            </div>
            <label for="email" className="mt-2 mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="Number"
                id="pNumber"
                name="phone"
                value={users.phone}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="0449967997"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </div>

              <label
                for="billing-address"
                class="mt-4 mb-2 block text-sm font-medium"
              >
                Shipping Address
              </label>

              <div class="relative ">
                <input
                  type="text"
                  id="shipping-address"
                  name="shipping-address"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                  e
                />
              </div>
            </div>

            <div class="mt-9 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">${totalAmount}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">$8.0</p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total to Pay</p>
              <p class="text-2xl font-semibold text-gray-900">
                ${totalAmount - 8}
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 pt-8 mt-1">
          {" "}
          <p className=" text-lg font-medium">Payment Methods</p>
          <p className="text-gray-400">Select Your Suitable payment Methods</p>
          <Payment />
          <Link to="/order">
            {" "}
            <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
