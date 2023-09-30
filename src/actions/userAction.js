import { toast } from "react-toastify";
import { getAllUsers, getUserById, postNewUser } from "../helper/axios";
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
};

export const getUserProfileAction = () => async (dispatch) => {
  //call the api to get user info
  const { status, user } = await getAllUsers();
  console.log(user, status);

  // mount the state
  if (status === "success") {
    dispatch(setUser(user));
  }
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
