import { FETCH_USER } from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        isAuthenticated: action.payload.length > 0,
        user: action.payload
      };
    default:
      return state;
  }
}
