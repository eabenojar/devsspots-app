import { FETCH_USER, FETCH_GOOGLE_MAPS } from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  googleMaps: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length !== 0,
        user: action.payload
      };
    case FETCH_GOOGLE_MAPS:
      return {
        ...state,
        googleMaps: action.payload
      };
    default:
      return state;
  }
}
