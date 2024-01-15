import { postPaymentIntent } from "../helper/axios";
import { toast } from "react-toastify";

export const postNewPayment = async (obj) => {
  const pendingResp = postPaymentIntent(obj);
  toast.promise(pendingResp, {
    pending: " please wait ..",
  });

  toast[status](message);
};
