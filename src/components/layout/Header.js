import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByCategoryIdAction,
  getProductsAction,
} from "../../actions/proudctAction";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getProducts, logoutUser } from "../../helper/axios";
import { setUser } from "../../redux/userSlice";
import { ShoppingCart, User } from "lucide-react";
import { setProduct } from "../../redux/productSlice";
export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayProduct, setDisplayProduct] = useState([]);
  const [productDt, setProductDt] = useState([]);
  const { cats } = useSelector((state) => state.catInfo);
  const { users } = useSelector((state) => state.userInfo);
  const { cart } = useSelector((state) => state.cartInfo);

  const handleOnLogout = () => {
    // log out from server by removing the access and refresh JWTs

    logoutUser(users._id);

    //clear storages
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");

    // reset store
    dispatch(setUser({}));
    navigate("/login");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { product } = await getProducts();
      setProduct(product);
    };
    fetchProducts();
  }, []);

  //handle on Search
  const handleOnSearch = (e) => {
    const { value } = e.target;
    const filterProduct = value.length
      ? productDt?.filter((item) =>
          item?.name?.toLowerCase().includes(value?.toLowerCase())
        )
      : [];
    setDisplayProduct(filterProduct);
  };

  return (
    <div>
      <header className="bg-blue-300">
        <div class="mx-auto flex h-16 max-w-screen-3xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link class="block text-teal-600" to={"/"}>
            <span class="sr-only">Home</span>
            <p>ManandharStore</p>
          </Link>

          <div class="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" class="hidden md:block">
              <ul class="flex items-center gap-6 text-sm">
                {cats?.map((item, i) => {
                  return (
                    <li key={i}>
                      <Link
                        to={`/category/${item.slug}/${item._id}`}
                        class="text-gray-500 transition hover:text-gray-500/75"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <label className="sr-only" htmlFor="search">
                  {" "}
                  Search{" "}
                </label>

                <input
                  className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56"
                  id="search"
                  onClick={handleOnSearch}
                  type="search"
                  placeholder="Search Product"
                />

                <button
                  type="button"
                  className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              <Link
                to={"/cart"}
                className="inline-flex items-center text-white bg-purple border-2 border-indigo-600 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded-lg text-base"
              >
                <ShoppingCart className="mr-2" />
                {cart?.length > 0 && (
                  <span className="text-xs font-semibold bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center transition-all animate-pulse">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>

            <div class="flex items-center gap-4">
              {users?._id ? (
                <div className="sm:flex sm:gap-4">
                  <Link
                    to={"/"}
                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                    onClick={handleOnLogout}
                  >
                    LogOut
                  </Link>
                </div>
              ) : (
                <div class="sm:flex sm:gap-4">
                  <Link
                    to={"/login"}
                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                  >
                    Register
                  </Link>
                </div>
              )}

              <button class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span class="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
