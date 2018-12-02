import axios from "axios";
import { AUTH_USER } from "./types";

export const loginUser = () => dispatch => {
  axios
    .get("/auth/google")
    .then(res => {
      console.log("SUCESS SENT FROM CLIENT", res.data);
      dispatch({
        type: AUTH_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("ERROR CLIENT", err);
    });
};
