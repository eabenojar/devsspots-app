import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => dispatch => {
  axios
    .get("/auth/current_user")
    .then(res => {
      console.log("SUCESS SENT FROM CLIENT", res.data);
      dispatch({
        type: FETCH_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("ERROR FAM", err);
    });
};
