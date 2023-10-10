//proudct api

import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const categoryAPI = rootAPI + "/catagory";
const productAPI = rootAPI + "/product";
const paymentAPI = rootAPI + "/payment";
const userAPI = rootAPI + "/user";

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
    console.log(headers);

    return data;
  } catch (error) {
    if (
      error?.response?.status === 403 &&
      error?.response?.data?.message === "jwt expired"
    ) {
      //1. get new accessJWt
      const { status, accessJWT } = await getNewAccessJWT();
      if (status === "success" && accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
      }

      //2. continue the request

      return axiosProcessor({ method, url, obj, isPrivate, refreshToken });
    }
    return {
      status: "error",
      message: error.response ? error?.response?.data?.message : error.message,
    };
  }
};

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
  console.log(obj);
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
  };

  return axiosProcessor(obj);
};

export const getUserById = (_id) => {
  const obj = {
    method: "get",
    url: userAPI,
  };
  return axiosProcessor(obj);
};

export const getAllUsers = () => {
  const obj = {
    method: "get",
    url: userAPI,
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
export const loginUser = (loginData) => {
  const obj = {
    method: "post",
    url: userAPI + "/login",
    obj: loginData,
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
