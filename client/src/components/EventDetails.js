import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEventDetails,
  joinEvent,
  leaveEvent
} from "../actions/eventActions";
import GoogleMapReact from "google-map-react";
import styles from "../styles/css/EventDetails.module.css";
import { FaLaptopCode, FaMapMarkerAlt } from "react-icons/fa";

import moment from "moment";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showJoin: true
    };

    this.renderMap = this.renderMap.bind(this);
    this.onJoinEvent = this.onJoinEvent.bind(this);
    this.onLeaveEvent = this.onLeaveEvent.bind(this);
  }
  componentDidMount() {
    const event = this.props.location.state;
    this.props.getEventDetails(event.category, event.id);

    console.log("EVENT DETAILS DID MOUNT", this.props);
    console.log("EVENT DETALS MAP", window.google);
  }
  componentWillReceiveProps(nextProps) {
    console.log("WILL RECEIVE PROPS", nextProps);
  }
  onLeaveEvent(event, userId) {
    console.log("LEAVE EVENT CLICKED", event, userId);
    this.props.leaveEvent(event._id, userId);
    this.setState(this.state);
  }
  onJoinEvent(event, userId) {
    console.log("JOIN EVEN CLICKED EVENT", event, "USER ID", userId);
    const user = {
      id: userId
    };
    this.props.joinEvent(event._id, user);
    this.setState({
      showJoin: false
    });
  }
  renderMap() {
    if (this.props.event.eventDetails.length === 0) {
      return <h1>Loading fam...</h1>;
    } else {
      const { eventLocation } = this.props.event.eventDetails[0];
      const Marker = props => (
        <div>
          <FaMapMarkerAlt size={25} color={"#82C4FF"} />
        </div>
      );

      return (
        <GoogleMapReact defaultCenter={eventLocation} defaultZoom={12}>
          <Marker
            lat={eventLocation.lat}
            lng={eventLocation.lng}
            text={"Marker"}
          />
        </GoogleMapReact>
      );
    }
  }
  renderDetails() {
    console.log("RENDER DETAILS PROPS", this.props.event);
    if (
      this.props.event.eventDetails === undefined ||
      this.props.event.eventDetails.length === 0
    ) {
      return <h1>Loading...</h1>;
    } else {
      const event = this.props.event.eventDetails[0];
      return (
        <div>
          <h1>Title {event.eventTitle}</h1>
          <h1>Desc {event.eventDescription}</h1>
          <h1>Address {event.eventAddress}</h1>
          <h1>Category {event.eventCategory}</h1>
          <h1>Category {event.eventCategory}</h1>
          <h1>Map Url </h1>
          <a href={event.eventMapUrl} target="_blank">
            link map
          </a>
          <h1>Start {moment(event.timeStart).format("hh:mm A")}</h1>
          <h1>Ends {moment(event.timeEnd).format("hh:mm A")}</h1>
          <h1>Date {moment(event.eventDate).format("dddd, MMMM DD, YYYY")}</h1>
          <h1>Attendees</h1>
          {event.eventAttendees === undefined ||
          event.eventAttendees.length == 0 ? (
            <h1>No one is going!!!</h1>
          ) : (
            event.eventAttendees.map((person, index) => {
              console.log("YAHAYAYAYAYAYAYA", person.profileImg);
              return (
                <div key={index}>
                  <img
                    src={!person.profileImg ? null : person.profileImg}
                    alt="Nothing Found"
                  />
                </div>
              );
            })
          )}
          <button
            onClick={() => this.onJoinEvent(event, this.props.auth.user[0]._id)}
          >
            Join Event
          </button>
          <button
            onClick={() =>
              this.onLeaveEvent(event, this.props.auth.user[0]._id)
            }
          >
            Leave Event
          </button>
        </div>
      );
    }
  }
  render() {
    console.log("EVENT DETAILS PROPS", this.props);

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.details}>{this.renderDetails()}</div>
          <div className={styles.map}>{this.renderMap()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.event,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getEventDetails, joinEvent, leaveEvent }
)(EventDetails);
