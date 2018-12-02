import axios from "axios";
import { AUTH_USER } from ".types";

export const loginUser = () => dispatch => {
  axios.post("/auth/google").then(res => {
    console.log("SUCESS SENT FROM CLIENT");
    dispatch({
      type: AUTH_USER,
      payload: res
    });
  });
};
