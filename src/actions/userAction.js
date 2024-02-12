import { toast } from "react-toastify";
import {
  getNewAccessJWT,
  getUser,
  loginUser,
  postNewUser,
} from "../helper/axios";
import { setUser, setUsers } from "../redux/userSlice";

export const postNewUserAction = async (obj) => {
  const pendingResp = postNewUser(obj);
  console.log(obj);
  toast.promise(pendingResp, {
    pending: " please wait ..",
  });
  const { status, message } = await pendingResp;

  toast[status](message);
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

// export const getUserByIdAction = (_id) => async (dispatch) => {
//   //call the api to get user info
//   const { status, user } = await getUserById(_id);
//   console.log(user, status);

//   // mount the state
//   //   if (status === "success") {
//   //     dispatch(setAdmin(user));
//   if (status === "success") {
//     dispatch(setUsers(user));
//   }
// };

export const getUserProfileAction = () => async (dispatch) => {
  //call the api to get user info
  const { status, user } = await getUser();
  console.log(user);

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
  console.log(accessJWT);

  const refreshJWT = localStorage.getItem("refreshJWT");
  console.log(refreshJWT);

  if (refreshJWT) {
    // request new accessJWT from server and all getAdminProfile

    const { accessJWT } = await getNewAccessJWT();

    if (accessJWT) {
      sessionStorage.setItem("accessJWT", accessJWT);
      dispatch(getUserProfileAction());
    }
  }
};
