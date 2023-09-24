import { getPayementOptons } from "../helper/axios";
import { setPayOptions } from "../redux/paymentOpSlice";

export const getPayOpsAction = () => async (dispatch) => {
  const { result, status } = await getPayementOptons();
  console.log(result);
  console.log(status);
  if (status === "success") {
    dispatch(setPayOptions(result));
  }
};
