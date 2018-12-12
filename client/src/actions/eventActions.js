import axios from "axios";
import {
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_USER_EVENTS,
  GET_CATEGORY_EVENTS,
  GET_EVENT_DETAILS,
  FETCH_GOOGLE_MAPS,
  JOIN_EVENT,
  LEAVE_EVENT
} from "./types";

export const fetchGoogleMaps = map => dispatch => {
  console.log("GOOGLE MAPS ACTION", map);
  dispatch({
    type: FETCH_GOOGLE_MAPS,
    payload: map
  });
};

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
  console.log("DELETE ACTION CALLED", id);
  axios
    .delete(`/api/events/${id}`)
    .then(res => {
      console.log("GOT SOMETING BACK FROM DELETE SERVER", res.data);
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
      payload: res.data
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
  axios.get(`/api/events/category/${category}/${eventId}`).then(res => {
    console.log("WE GOT THE EVENT DETAILS FAM", res.data);
    dispatch({
      type: GET_EVENT_DETAILS,
      payload: res.data
    });
  });
};

export const joinEvent = (eventId, userId) => dispatch => {
  console.log("JOIN EVENT ACTION", eventId);
  axios
    .post(`/api/events/category/join/${eventId}`, userId)
    .then(res => {
      console.log("SUCCES JOINED EVENT FROM ACTION", res.data);
      dispatch({
        type: JOIN_EVENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err, "ERROR FAM!");
    });
};

export const leaveEvent = (eventId, userId) => dispatch => {
  console.log("GOT TO ACTION FOR LEAVE EVENT", eventId, userId);
  axios
    .delete(`/api/events/category/join/${eventId}/${userId}`)
    .then(res => {
      console.log("DELETED THE EVENT ATTENDEES FAM!", res.data);
      dispatch({
        type: LEAVE_EVENT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err, "ERROR LEAVE FAM FAM!");
    });
};
