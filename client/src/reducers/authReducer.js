import { AUTH_USER } from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
