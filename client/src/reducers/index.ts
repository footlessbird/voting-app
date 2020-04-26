import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { polls, currentPoll } from "./pollReducer";

export default combineReducers({
  auth: authReducer,
  polls,
  currentPoll,
});
