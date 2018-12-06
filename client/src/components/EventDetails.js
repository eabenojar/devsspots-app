import React, { Component } from "react";
import { connect } from "react-redux";
import { getEventDetails } from "../actions/eventActions";
import GoogleMapReact from "google-map-react";
import styles from "../styles/css/EventDetails.module.css";
import { FaLaptopCode, FaMapMarkerAlt } from "react-icons/fa";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.renderMap = this.renderMap.bind(this);
  }
  componentDidMount() {
    const event = this.props.location.state;
    this.props.getEventDetails(event.category, event.id);
    console.log("EVENT DETAILS DID MOUNT", this.props);
    console.log("EVENT DETALS MAP", window.google);
  }
  renderMap() {
    if (this.props.event.eventDetails) {
      const { eventLocation } = this.props.event.eventDetails;
      console.log("RENDER LAT LONG", eventLocation.lat, eventLocation.lng);
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
    } else {
      return <h1>Loading fam...</h1>;
    }
  }
  render() {
    console.log("EVENT DETAILS PROPS", this.props);

    return (
      <div>
        <h1>Event Details</h1>
        <div className={styles.map}>{this.renderMap()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    event: state.event
  };
};

export default connect(
  mapStateToProps,
  { getEventDetails }
)(EventDetails);
