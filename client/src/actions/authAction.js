import axios from "axios";
import { FETCH_USER, FETCH_GOOGLE_MAPS } from "./types";

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

export const fetchGoogleMaps = map => dispatch => {
  console.log("GOOGLE MAPS ACTION", map);
  dispatch({
    type: FETCH_GOOGLE_MAPS,
    payload: map
  });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({
    type: FETCH_USER,
    payload: ""
  });
};

export const getProfile = userId => dispatch => {};
