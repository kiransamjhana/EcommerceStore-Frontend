import { toast } from "react-toastify";
import { getUserById, postNewUser } from "../helper/axios";

export const postNewUserAction = async (obj) => {
  const pendingResp = postNewUser(obj);
  console.log(obj);
  toast.promise(pendingResp, {
    pending: " please wait ..",
  });
  const { status, message } = await pendingResp;

  toast[status](message);
};

export const getUserByIdAction = (_id) => async (dispatch) => {
  //call the api to get user info
  const { status, user } = await getUserById(_id);
  console.log(user, status);

  // mount the state
  //   if (status === "success") {
  //     dispatch(setAdmin(user));
};
