import { useDispatch } from "react-redux";
import { getOrders, postNewOrder } from "../helper/axios";
import { toast } from "react-toastify";
import { setOrder } from "../redux/orderSlice";

export const postNewOrderAction = async (obj) => {
  console.log(obj);
  const pendingResp = postNewOrder(obj);
  console.log(pendingResp);

  const { status, message } = await pendingResp;

  toast[status](message);
};

export const getOrderAction = () => async (dispatch) => {
  const { status, order } = await getOrders();
  console.log(order);
  if (status === "success") {
    /// mount data in the store
    dispatch(setOrder(order));
  }
};
