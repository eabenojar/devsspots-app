import { AUTH_USER } from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
}
