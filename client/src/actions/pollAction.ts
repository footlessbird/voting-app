import axios from "axios";
import { SET_POLLS, SET_CURRENT_POLL, Poll } from "./types";
import { addError, removeError } from "./errorAction";

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
    dispatch(removeError());
  } catch (err) {
    // console.error("getPolls err ", err.response.data);
    console.error("getPolls err ", err.response.data.error.message);
    const errMsg = err.response.data.error.message;
    dispatch(addError(errMsg));
  }
};

export const getUserPolls = () => async (dispatch) => {
  try {
    const polls = await axios.get("/polls/user");
    dispatch(setPolls(polls.data));
    dispatch(removeError());
  } catch (err) {
    console.error(err);
    const errMsg = err.response.data.error.message;
    dispatch(addError(errMsg));
  }
};

export const getCurrentPoll = (path) => async (dispatch) => {
  try {
    const poll = await axios.get(`/polls/${path}`);
    dispatch(setCurrentPoll(poll.data));
    dispatch(removeError());
  } catch (err) {
    console.error(err);
    const errMsg = err.response.data.error.message;
    dispatch(addError(errMsg));
  }
};

export const createPoll = (data) => async (dispatch) => {
  try {
    const poll = await axios.post("/polls", data);
    dispatch(setCurrentPoll(poll.data));
    dispatch(removeError());
  } catch (err) {
    console.error(err);
    const errMsg = err.response.data.error.message;
    dispatch(addError(errMsg));
  }
};

export const vote = (path, data) => async (dispatch) => {
  try {
    const poll = await axios.post(`/polls/${path}`, data);
    dispatch(setCurrentPoll(poll.data));
    dispatch(removeError());
  } catch (err) {
    const errMsg = err.response.data.error.message;
    dispatch(addError(errMsg));
  }
};
