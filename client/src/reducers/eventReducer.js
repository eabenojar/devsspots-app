import { ADD_EVENT, GET_USER_EVENTS } from "../actions/types";

const initialState = {
  events: [],
  event: [],
  eventsHosted: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        event: action.paylod
      };
    case GET_USER_EVENTS:
      return {
        ...state,
        eventsHosted: [...state.eventsHosted, action.paylod]
      };
    default:
      return state;
  }
}
