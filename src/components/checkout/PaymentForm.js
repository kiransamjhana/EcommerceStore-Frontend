import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { postNewPayment } from "../../actions/stripeAction";
import { useDispatch, useSelector } from "react-redux";

export const PaymentForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [form, setForm] = useState({});
  const { cart } = useSelector((state) => state.cartInfo);

  const { users } = useSelector((state) => state.userInfo);
  const totalAmount = cart.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error(error);
      } else {
        // Use the paymentMethod.id to send to your server
        postNewPayment(form, totalAmount);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(form);

  return (
    <form onSubmit={handleSubmit}>
      {" "}
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
              onChange={handleOnChange}
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
              onChange={handleOnChange}
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
              onChange={handleOnChange}
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
                onChange={handleOnChange}
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
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Total to Pay</p>
            <p
              class="text-2xl font-semibold text-gray-900"
              onChange={handleOnChange}
            >
              ${totalAmount}
            </p>
          </div>
          <CardElement />
          <button
            class="mt-4 mb-8 w-full rounded-md bg-green-900 px-6 py-3 font-medium text-white"
            type="submit"
          >
            Pay
          </button>
        </div>
      </div>
    </form>
  );
};
