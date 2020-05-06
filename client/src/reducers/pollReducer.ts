import { SET_POLLS, SET_CURRENT_POLL } from "../actions/types";
import { Poll, PollAction } from "../actions/types";

export function polls(state: Poll[] = [], action: PollAction) {
  switch (action.type) {
    case SET_POLLS:
      return action.polls;

    default:
      return state;
  }
}

export function currentPoll(
  state: Poll = {
    _id: "",
    user: "",
    question: "",
    option: [],
    voted: [],
    createdAt: "",
  },
  action
) {
  switch (action.type) {
    case SET_CURRENT_POLL:
      return action.poll;

    default:
      return state;
  }
}
