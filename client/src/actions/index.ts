import axios from "axios";
import {
  FETCH_USER,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  SET_POLLS,
  SET_CURRENT_POLL,
  ADD_ERROR,
  REMOVE_ERROR,
} from "./types";

import { addError, removeError } from "./errorAction";

type Option = {
  option: string;
  votes: number;
};

export type Poll = {
  _id: string;
  user: string;
  question: string;
  option: Option[];
  voted: string[];
  createdAt: string;
};

// export type PollAction =
//   | ReturnType<typeof setPolls>
//   | ReturnType<typeof setCurrentPoll>;

export type PollAction =
  | { type: "SET_POLLS"; polls: Poll[] }
  | { type: "SET_CURRENT_POLL"; poll: Poll };

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
    // console.log(
    //   "errrrr",
    //   err.config,
    //   err.request,
    //   err.response,
    //   err.isAxiosError,
    //   err.toJSON
    // );
    console.log("errrr", err.response.data);
    // dispatch({ type: AUTH_ERROR, payload: err });
    dispatch(addError(err.response.data));
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
    dispatch(setPolls(polls.data));
  } catch (err) {
    console.error(err);
  }
};

export const getUserPolls = () => async (dispatch) => {
  try {
    const polls = await axios.get("/polls/user");
    dispatch(setPolls(polls.data));
  } catch (err) {
    console.error(err);
  }
};

export const getCurrentPoll = (path) => async (dispatch) => {
  try {
    const poll = await axios.get(`/polls/${path}`);
    dispatch(setCurrentPoll(poll.data));
  } catch (err) {
    console.error(err);
  }
};

export const createPoll = (data) => async (dispatch) => {
  try {
    const poll = await axios.post("/polls", data);
    dispatch(setCurrentPoll(poll.data));
  } catch (err) {
    console.error(err);
  }
};

export const vote = (path, data) => async (dispatch) => {
  try {
    const poll = await axios.post(`/polls/${path}`, data);
    dispatch(setCurrentPoll(poll.data));
  } catch (err) {
    console.error("vote action error ", err.response.data);
    dispatch(addError(err.response.data));
  }
};
