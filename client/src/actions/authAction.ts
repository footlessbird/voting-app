import axios from "axios";
import { FETCH_USER, USER_LOADED, AUTH_ERROR, LOGOUT_SUCCESS } from "./types";
import { addError, removeError } from "./errorAction";

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER });
  try {
    const res = await axios.get("/auth/current_user");
    //   console.log("user data", res.data);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(removeError());
  } catch (err) {
    console.log("fetchUser err ", err);
    dispatch({ type: AUTH_ERROR, payload: err });
    const errMsg = err.response.data.error.message;
    dispatch(addError(errMsg));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/auth/logout");
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch(removeError());
  } catch (err) {
    // throw new Error(err);
    const errMsg = err.response.data.error.message;
    dispatch(addError(errMsg));
  }
};
