import {
  FETCH_USER,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  console.log("action", action);
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        user: null,
      };
    case USER_LOADED:
      console.log("user should not be empty string", action.payload);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.payload === "" ? false : true,
        user: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
