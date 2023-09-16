import {
  getProductByCategoryId,
  getProductById,
  getProducts,
} from "../helper/axios";
import { setProduct } from "../redux/productSlice";

export const getProductsAction = () => async (dispatch) => {
  const { status, products } = await getProducts();

  if (status === "success") {
    /// mount data in the store
    dispatch(setProduct(products));
  }
};

export const getProductByIdAction = (_id) => async (dispatch) => {
  const { status, products } = await getProductById();

  if (status === "success") {
    /// mount data in the store
    dispatch(setProduct(products));
  }
};

export const getProductByCategoryIdAction = () => async (dispatch) => {
  const { status, product, message } = await getProductByCategoryId();
  console.log(product);
  if (status === "success") {
    /// mount data in the store
    dispatch(setProduct(product));
  }
};