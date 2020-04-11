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

export default function (state = initialState, action: any) {
  console.log("action", action);
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
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
