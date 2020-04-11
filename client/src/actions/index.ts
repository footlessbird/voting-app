import axios from "axios";
import { FETCH_USER, USER_LOADED, AUTH_ERROR, LOGOUT_SUCCESS } from "./types";

export const fetchUser = () => async (dispatch: any) => {
  dispatch({ type: FETCH_USER });
  try {
    const res = await axios.get("/api/current_user");
    console.log("user data", res.data);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err });
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    await axios.get("/api/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    throw new Error(err);
  }
};
