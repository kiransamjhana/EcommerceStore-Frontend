import { getCategories, getCategoryById } from "../helper/axios";
import { setCats } from "../redux/categorySlice";

export const getCatsAction = () => async (dispatch) => {
  const { status, result } = await getCategories();
  console.log(result);
  if (status === "success") {
    // mount in the state
    dispatch(setCats(result));
  }
};

export const getCatsByIdAction = (_id) => async (dispatch) => {
  const { status, result } = await getCategoryById(_id);

  if (status === "success") {
    // mount in the state
    dispatch(setCats(result));
  }
};
