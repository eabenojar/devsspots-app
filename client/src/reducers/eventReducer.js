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
      console.log("GET USER EVENTS", action.payload);
      return {
        ...state,
        eventsHosted: action.payload
      };
    default:
      return state;
  }
}
