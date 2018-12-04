import axios from "axios";
import {
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_USER_EVENTS
} from "./types";

export const addEvent = event => dispatch => {
  console.log("CREATE EVENT ACTION", event);
  axios
    .post("/api/events/new", event)
    .then(res => {
      console.log("SUCCESS SAVED CLIENT", res.data);
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
  axios
    .delete(`"api/event/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_EVENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("ERROR FAM", err);
    });
};

export const updateEvent = id => dispatch => {
  axios.patch(`api/event/${id}`).then(res => {
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    });
  });
};

export const getUserEvents = userId => dispatch => {
  axios.get(`/api/events/${userId}`).then(res => {
    dispatch({
      type: GET_USER_EVENTS,
      payload: res.data
    });
  });
};
