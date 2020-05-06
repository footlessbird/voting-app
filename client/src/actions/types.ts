export const FETCH_USER = "FETCH_USER";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const SET_POLLS = "SET_POLLS";
export const SET_CURRENT_POLL = "SET_CURRENT_POLL";
export const ADD_ERROR = "ADD_ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";

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

export type PollAction =
  | { type: "SET_POLLS"; polls: Poll[] }
  | { type: "SET_CURRENT_POLL"; poll: Poll };
