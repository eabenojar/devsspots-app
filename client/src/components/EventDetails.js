import React, { Component } from "react";
import { connect } from "react-redux";
import { getEventDetails, joinEvent } from "../actions/eventActions";
import GoogleMapReact from "google-map-react";
import styles from "../styles/css/EventDetails.module.css";
import { FaLaptopCode, FaMapMarkerAlt } from "react-icons/fa";
import moment from "moment";

class EventDetails extends Component {
  constructor(props) {
    super(props);

    this.renderMap = this.renderMap.bind(this);
    this.onJoinEvent = this.onJoinEvent.bind(this);
  }
  componentDidMount() {
    const event = this.props.location.state;
    this.props.getEventDetails(event.category, event.id);

    console.log("EVENT DETAILS DID MOUNT", this.props);
    console.log("EVENT DETALS MAP", window.google);
  }
  onJoinEvent(event, userId) {
    console.log("JOIN EVEN CLICKED EVENT", event, "USER ID", userId);
    const user = {
      id: userId
    };
    this.props.joinEvent(event._id, user);
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
    if (this.props.event.eventDetails.length === 0) {
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
          <button
            onClick={() => this.onJoinEvent(event, this.props.auth.user[0]._id)}
          >
            Join Event
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
  { getEventDetails, joinEvent }
)(EventDetails);
