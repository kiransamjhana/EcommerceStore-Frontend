import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { autoLogin, logInUserAction } from "../../actions/userAction";
const initialState = {
  email: "",
  password: "",
};
export const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { users } = useSelector((state) => state.userInfo);

  const pathTo = location.state?.from?.location?.pathname || "/";
  useEffect(() => {
    users?._id && navigate(pathTo);
  }, [users, navigate, pathTo]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUserAction(form));
  };

  return (
    <div>
      {" "}
      <div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat">
        <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div class="text-white">
            <div class="mb-8 flex flex-col items-center">
              <img
                src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                width="150"
                alt=""
                srcset=""
              />
              <h1 class="mb-2 text-2xl">Instagram</h1>
              <span class="text-gray-300">Enter Login Details</span>
            </div>
            <form onSubmit={handleOnSubmit}>
              <div class="mb-4 text-lg">
                <input
                  class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="email"
                  onChange={handleOnChange}
                  name="email"
                  placeholder="id@email.com"
                  required="true"
                />
              </div>

              <div class="mb-4 text-lg">
                <input
                  class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="password"
                  placeholder="*********"
                  onChange={handleOnChange}
                  required="true"
                />
              </div>
              <div class="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  class="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
