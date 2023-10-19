import { toast } from "react-toastify";
import {
  getAllUsers,
  getNewAccessJWT,
  getUserById,
  loginUser,
  postNewUser,
} from "../helper/axios";
import { setUser } from "../redux/userSlice";

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
  if (status === "success") {
    dispatch(setUser(user));
  }
};

export const getUserProfileAction = () => async (dispatch) => {
  //call the api to get user info
  const { status, user } = await getAllUsers();

  // mount the state
  if (status === "success") {
    dispatch(setUser(user));
  }
};
export const logInUserAction = (obj) => async (dispatch) => {
  const pendingResp = loginUser(obj);

  toast.promise(pendingResp, {
    pending: "Please await..",
  });
  const { status, message, token } = await pendingResp;

  toast[status](message);

  if (status === "success") {
    sessionStorage.setItem("accessJWT", token.accessJWT);
    localStorage.setItem("refreshJWT", token.refreshJWT);
    dispatch(getUserProfileAction());
  }
  //get the user data and mount in the state
};
export const autoLogin = () => async (dispatch) => {
  //check if accessJwt exist in session
  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    return dispatch(getUserProfileAction());
  }

  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    // request new accessJWT from server and all getAdminProfile

    const { accessJWT } = await getNewAccessJWT();

    if (accessJWT) {
      sessionStorage.setItem("accessJWT", accessJWT);
      dispatch(getUserProfileAction());
    }
  }
};
