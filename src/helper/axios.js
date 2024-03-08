//proudct api

import axios from "axios";

const rootAPI =
  process.env.REACT_APP_ROOTAPI ||
  "http://frontend-api-env.eba-tam9s2et.ap-southeast-2.elasticbeanstalk.com/api/v1/store ";
const categoryAPI = rootAPI + "/catagory";
const productAPI = rootAPI + "/product";
const paymentAPI = rootAPI + "/payment";
const userAPI = rootAPI + "/user";
const orderAPI = rootAPI + "/order";
// const stripeAPI = rootAPI + "/payment-intent";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};
const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};
// Global axios proccesser function
const axiosProcessor = async ({
  method,
  url,
  obj,
  isPrivate,
  refreshToken,
}) => {
  const token = refreshToken ? getRefreshJWT() : getAccessJWT();
  const headers = {
    Authorization: isPrivate ? token : null,
  };
  try {
    const { data } = await axios({
      method,
      url,
      data: obj,
      headers,
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.response ? error?.response?.data?.message : error.message,
    };
  }
};

// get category

export const getCategories = () => {
  const obj = {
    method: "get",
    url: categoryAPI,
  };
  console.log(obj);

  return axiosProcessor(obj);
};
export const getCategoryById = (_id) => {
  const obj = {
    method: "get",
    url: categoryAPI,
  };

  return axiosProcessor(obj);
};

//ProductAPI

export const getProducts = () => {
  const obj = {
    method: "get",
    url: productAPI,
  };

  return axiosProcessor(obj);
};

export const getProductByCategoryId = (object) => {
  const obj = {
    method: "get",
    url: productAPI + "/category/" + object.obj,
  };

  return axiosProcessor(obj);
};

export const getProductById = (_id) => {
  console.log(_id);
  const obj = {
    method: "get",
    url: productAPI + "/" + _id,
  };
  return axiosProcessor(obj);
};

// Payment API

export const getPayementOptons = () => {
  const obj = {
    method: "get",
    url: paymentAPI,
  };

  return axiosProcessor(obj);
};

//User API

export const postNewUser = (data) => {
  const obj = {
    method: "post",
    url: userAPI,
    obj: data,
  };

  return axiosProcessor(obj);
};

export const PostNewUserVerificationInfo = (data) => {
  const obj = {
    method: "post",
    url: userAPI + "/user-verification",
    obj: data,
    isPrivate: true,
  };

  return axiosProcessor(obj);
};
export const loginUser = (loginData) => {
  const obj = {
    method: "post",
    url: userAPI + "/login",
    obj: loginData,
  };

  return axiosProcessor(obj);
};

export const getUser = () => {
  const obj = {
    method: "get",
    url: userAPI,
    isPrivate: true,
  };
  return axiosProcessor(obj);
};

export const getAllUsers = () => {
  const obj = {
    method: "get",
    url: userAPI + "/get-users",
    isPrivate: true,
  };

  return axiosProcessor(obj);
};

// ==== get new refreshJWT
export const getNewAccessJWT = () => {
  const obj = {
    method: "get",
    url: userAPI + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  };

  return axiosProcessor(obj);
};

export const logoutUser = (_id) => {
  const obj = {
    method: "post",
    url: userAPI + "/logout",
    obj: {
      _id,
      accessJwt: getAccessJWT(),
      refreshJWT: getRefreshJWT(),
    },
  };
  return axiosProcessor(obj);
};

/// Order axios
export const postNewOrder = (data) => {
  const obj = {
    method: "post",
    url: orderAPI,
    obj: data,
    isPrivate: true,
  };

  return axiosProcessor(obj);
};

export const getOrders = () => {
  const obj = {
    method: "get",
    url: orderAPI,
  };

  return axiosProcessor(obj);
};

export const getOrdersByEmail = (email) => {
  const obj = {
    method: "get",
    url: orderAPI,
    email,
  };

  return axiosProcessor(obj);
};
