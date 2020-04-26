import axios from "axios";
import {
  FETCH_USER,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  SET_POLLS,
  SET_CURRENT_POLL,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER });
  try {
    const res = await axios.get("/auth/current_user");
    console.log("user data", res.data);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/auth/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    throw new Error(err);
  }
};

export const setPolls = (polls) => ({
  type: SET_POLLS,
  polls,
});

export const setCurrentPoll = (poll) => ({
  type: SET_CURRENT_POLL,
  poll,
});

export const getPolls = () => async (dispatch) => {
  try {
    const polls = await axios.get("/polls");
    dispatch(setPolls(polls));
  } catch (err) {
    console.error(err);
  }
};

export const getUserPolls = () => async (dispatch) => {
  try {
    const polls = await axios.get("/polls/user");
    dispatch(setPolls(polls));
  } catch (err) {
    console.error(err);
  }
};

export const getCurrentPoll = (path) => async (dispatch) => {
  try {
    const poll = await axios.get(`polls/${path}`);
    dispatch(setCurrentPoll(poll));
  } catch (err) {
    console.error(err);
  }
};

export const createPoll = (data) => async (dispatch) => {
  try {
    const poll = await axios.post("/polls", data);
    dispatch(setCurrentPoll(poll));
  } catch (err) {
    console.error(err);
  }
};

export const vote = (path, data) => async (dispatch) => {
  try {
    const poll = await axios.post(`/polls/${path}`, data);
    dispatch(setCurrentPoll(poll));
  } catch (err) {
    console.error(err);
  }
};
