import { combineReducers } from "redux";
import auth from "./authReducer";
import event from "./eventReducer";

export default combineReducers({
  auth,
  event
});
