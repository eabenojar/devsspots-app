import {
  ADD_EVENT,
  GET_USER_EVENTS,
  GET_CATEGORY_EVENTS,
  GET_EVENT_DETAILS
} from "../actions/types";

const initialState = {
  events: [],
  event: [],
  eventsHosted: [],
  categoryEvents: [],
  eventDetails: []
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
        eventsHosted: action.payload
      };
    case GET_CATEGORY_EVENTS:
      return {
        categoryEvents: action.payload
      };
    case GET_EVENT_DETAILS:
      return {
        eventDetails: action.payload
      };
    default:
      return state;
  }
}
