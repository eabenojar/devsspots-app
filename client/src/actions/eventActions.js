import axios from "axios";
import {
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_USER_EVENTS,
  GET_CATEGORY_EVENTS,
  GET_EVENT_DETAILS
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
  console.log("GET USER EVENTS CALLED ", userId);
  axios.get(`/api/events/${userId}`).then(res => {
    console.log("IT WORKED FROM SERVER GET USER EVENTS", res.data);
    dispatch({
      type: GET_USER_EVENTS,
      payload: res.data.eventsHosted
    });
  });
};

export const getCategoryEvents = category => dispatch => {
  console.log("GET CATEGORY EVENTS ACTION YEEEEEEE", category);
  axios.get(`/api/events/category/${category}`).then(res => {
    console.log("GET EVENTS BACK", res.data);
    dispatch({
      type: GET_CATEGORY_EVENTS,
      payload: res.data
    });
  });
};

export const getEventDetails = (category, eventId) => dispatch => {
  console.log("MADE IT TO GET EVENT DETAILS ACTION", category, eventId);
  axios.get(`/api/events/category/${category}/${eventId}`).then(res => {
    console.log("WE GOT THE EVENT DETAILS FAM", res.data);
    dispatch({
      type: GET_EVENT_DETAILS,
      payload: res.data
    });
  });
};
