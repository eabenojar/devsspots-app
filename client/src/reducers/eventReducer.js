import {
  ADD_EVENT,
  GET_USER_EVENTS,
  GET_CATEGORY_EVENTS,
  GET_EVENT_DETAILS,
  DELETE_EVENT,
  JOIN_EVENT,
  LEAVE_EVENT,
  UPDATE_EVENT
} from "../actions/types";

const initialState = {
  events: [],
  event: [],
  eventsHosted: [],
  categoryEvents: [],
  eventsAttended: [],
  eventDetails: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        event: [...state.event, action.payload]
      };
    case UPDATE_EVENT:
      return {
        event: [...state.event, action.payload]
      };
    case GET_USER_EVENTS:
      return {
        ...state,
        eventsHosted: action.payload.eventsHosted,
        eventsAttended: action.payload.eventsAttended
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

    case JOIN_EVENT:
      return {
        eventDetails: [action.payload]
      };
    case LEAVE_EVENT:
      return {
        eventDetails: [action.payload]
      };
    case DELETE_EVENT:
      return {
        ...state,
        eventsHosted: state.eventsHosted.filter(
          element => element._id !== action.payload._id
        )
      };
    default:
      return state;
  }
}
