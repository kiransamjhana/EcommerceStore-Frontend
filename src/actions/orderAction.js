import { postNewOrder } from "../helper/axios";
import { toast } from "react-toastify";
export const postNewOrderAction = async (obj) => {
  console.log(obj);
  const pendingResp = postNewOrder(obj);
  console.log(obj);
  toast.promise(pendingResp, {
    pending: " please wait ..",
  });
  const { status, message } = await pendingResp;
  console.log(status);
  toast[status](message);
};
