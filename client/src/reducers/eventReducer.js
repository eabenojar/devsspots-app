import {
  ADD_EVENT,
  GET_USER_EVENTS,
  GET_CATEGORY_EVENTS,
  GET_EVENT_DETAILS,
  FETCH_GOOGLE_MAPS
} from "../actions/types";

const initialState = {
  events: [],
  event: [],
  eventsHosted: [],
  categoryEvents: [],
  eventDetails: [],
  googleMaps: []
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
        ...state,
        categoryEvents: action.payload
      };
    case GET_EVENT_DETAILS:
      return {
        eventDetails: [...state.eventDetails, action.payload]
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
