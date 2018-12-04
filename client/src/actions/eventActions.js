import axios from "axios";
import { ADD_EVENT } from "./types";

export const addEvent = () => dispatch => {
  console.log("CREATE EVENT ACTION");
  axios
    .post("/event/new")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("ERROR FAM", err);
    });
};

export const deleteEvent = id => dispatch => {
  axios.delete("/event/delete");
};
