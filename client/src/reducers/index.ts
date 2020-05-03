import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { polls, currentPoll } from "./pollReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  polls,
  currentPoll,
  error: errorReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
