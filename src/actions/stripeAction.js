import { postPaymentIntent } from "../helper/axios";
import { toast } from "react-toastify";

export const postNewPayment = async (obj) => {
  const pendingResp = postPaymentIntent(obj);
  console.log(obj);
  toast.promise(pendingResp, {
    pending: " please wait ..",
  });
  const { status, message } = await pendingResp;

  toast[status](message);
};
