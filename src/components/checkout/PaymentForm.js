import React, { useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { postNewOrderAction } from "../../actions/orderAction";
import { OrderNumber } from "../../helper/orderNumber";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const { cart } = useSelector((state) => state.cartInfo);
  console.log(cart);
  const { users } = useSelector((state) => state.userInfo);
  console.log(users._id);
  const amount = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity + 10;
  }, 0);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      amount,
      currency: "aud",
      paymentMethodType: "card",

      [name]: value,
    });
  };

  const name = form.name;
  const email = form.email;
  const address = form.shipping;
  const phone = form.phone;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const apiUrl = "http://localhost:8200/api/v1/store/payment-intent";

      const { data } = await axios.post(apiUrl, {
        amount,
        currency: "aud",
        paymentMethodType: "card",
      });

      console.log(data);
      const clientSecret = data.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: form.flName,
            email: form.email,
          },
        },
      });
      console.log(paymentIntent);
      const { status, id, currency, payment_method } = paymentIntent;

      const obj = {
        name,
        email,
        phone,
        address,
        amount,
        payStatus: status,
        transId: id,
        currency,
        payment_method,
        cart,
        products: cart.map((item) => ({
          productId: item._id,
          productName: item.name,
          quantity: item.quantity,
        })),

        userId: users._id,
      };
      console.log(obj, "from payment form");
      console.log(paymentIntent);

      if (paymentIntent.status === "succeeded") {
        postNewOrderAction(obj);
        localStorage.setItem("orderNumber", id);
        navigate("/order");

        // call your order server to create new order in the db
      } else {
        alert("Couldn't process the payment, try agian later");
      }

      //   confirming the payment to strip server
    } catch (error) {}
  };

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
              required="true"
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
              type="email"
              id="email"
              name="email"
              onChange={handleOnChange}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="kiran@yahoo.com"
              required="true"
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
              type="number"
              id="pNumber"
              name="phone"
              maxLength={10}
              minLength={10}
              required="true"
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
                id="saddress"
                name="shipping"
                required="true"
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
              <p class="font-semibold text-gray-900">${amount}</p>
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Total to Pay</p>
            <p
              class="text-2xl font-semibold text-gray-900"
              onChange={handleOnChange}
            >
              ${amount}
            </p>
          </div>
          <CardElement />
          <hr />
          <div>
            <button
              class="mt-4 mb-8 w-full rounded-md bg-green-900 px-6 py-3 font-medium text-white"
              type="submit"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
