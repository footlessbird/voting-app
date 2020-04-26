import { SET_POLLS, SET_CURRENT_POLL } from "../actions/types";

export function polls(state = [], action: any) {
  switch (action.type) {
    case SET_POLLS:
      return action.polls;

    default:
      return state;
  }
}

export function currentPoll(state = {}, action: any) {
  switch (action.type) {
    case SET_CURRENT_POLL:
      return action.poll;

    default:
      return state;
  }
}
