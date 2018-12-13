import { combineReducers } from "redux";
import auth from "./authReducer";
import event from "./eventReducer";
import error from "./errorReducer";

export default combineReducers({
  auth,
  event,
  error
});
