import React, { useEffect } from "react";
import { SignIn } from "../../components/user/SignIn";
import { useDispatch } from "react-redux";
import { getUserProfileAction } from "../../actions/userAction";

export const UserSignIn = () => {
  // }, []);
  return (
    <div>
      <SignIn />
    </div>
  );
};
