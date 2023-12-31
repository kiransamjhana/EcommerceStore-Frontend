import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../redux/cartSlice";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartInfo);
  const { users } = useSelector((state) => state.userInfo);
  console.log(users);
  // const [qty, setQty] = useState([]);

  const handleOnCheckOut = () => {
    users._id ? navigate("/checkOut") : navigate("/login");
  };
  if (cart.length === 0) {
    return (
      <div className="h-[90vh] flex justify-center items-center text-4xl ">
        Cart is Empty
      </div>
    );
  }

  const handleOnDelete = (_id) => {
    dispatch(removeItemFromCart(_id));
    navigate("/cart");
  };

  const totalAmount = cart.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  let discount = (20 / 100) * totalAmount;
  let excludeDecimalDiscont = Math.floor(discount);
  // useEffect(() => {
  //   dispatch(setCart(qty));
  // }, [qty]);

  return (
    <div>
      <Header />

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cart?.map((item, i) => {
                  return (
                    <li key={item._id} className="flex items-center gap-2">
                      <img
                        src={
                          process.env.REACT_APP_ROOTSERVER +
                          item.thumbnail?.slice(6)
                        }
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">
                          {item.name} ${item.price}
                        </h3>

                        <h1 className="text-sm text-gray-900"></h1>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-4">
                        <form>
                          <div>
                            <label
                              htmlFor="HeadlineAct"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Qty
                            </label>

                            <select
                              name="quantity"
                              id="quantity"
                              className="mt-1.5 w-full rounded-lg text-gray-700 sm:text-sm"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                            </select>
                          </div>
                        </form>

                        <button
                          className="text-gray-600 transition hover:text-red-600"
                          onClick={() => {
                            handleOnDelete(item._id);
                          }}
                        >
                          <span className="sr-only">Remove item</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>{excludeDecimalDiscont}</dd>
                    </div>

                    {/* <div className="flex justify-between">
                      <dt>GST</dt>
                      <dd>£25</dd>
                    </div> */}

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd> {totalAmount - excludeDecimalDiscont}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-col items-center gap-4 rounded-lg bg-green-300 p-6 shadow-lg sm:flex-row sm:justify-between">
                    <strong className="text-xl text-black sm:text-xl">
                      Congratulations you have saved AUD{excludeDecimalDiscont}$
                    </strong>
                  </div>

                  <button
                    onClick={handleOnCheckOut}
                    className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
