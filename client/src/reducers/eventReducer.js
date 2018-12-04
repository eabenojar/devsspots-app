import { ADD_EVENT } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        event: action.paylod
      };
    default:
      return state;
  }
}
