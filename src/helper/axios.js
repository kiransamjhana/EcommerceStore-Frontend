//proudct api

import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const categoryAPI = rootAPI + "/catagory";
const productAPI = rootAPI + "/product";
const paymentAPI = rootAPI + "/payment";

// Global axios proccesser function
const axiosProcessor = async ({ method, url, obj }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: obj,
    });

    return data;
  } catch (error) {
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
  console.log(obj);
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
