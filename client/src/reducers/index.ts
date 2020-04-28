import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { polls, currentPoll } from "./pollReducer";
// import { DefaultRootState } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  polls,
  currentPoll,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
