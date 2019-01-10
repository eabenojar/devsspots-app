import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEventDetails,
  joinEvent,
  leaveEvent
} from "../actions/eventActions";
import GoogleMapReact from "google-map-react";
import styles from "../styles/css/EventDetails.module.css";
import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";

import moment from "moment";

// const mapEnvironment = compose(GoogleMapReact);

// const Marker = props => (
//   <div>
//     <FaMapMarkerAlt size={25} color={"#FF0000"} />
//   </div>
// );

// const MapLayout = props => (
//   <GoogleMapReact
//     defaultCenter={props}
//     defaultZoom={12}
//     bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
//   >
//     <Marker lat={props.lat} lng={props.lng} text={"Marker"} />
//   </GoogleMapReact>
// );
// const MapComponent = mapEnvironment(MapLayout);

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showJoin: true
    };

    this.renderMap = this.renderMap.bind(this);
    this.onJoinEvent = this.onJoinEvent.bind(this);
    this.onLeaveEvent = this.onLeaveEvent.bind(this);
    this.renderMapHeader = this.renderMapHeader.bind(this);
  }
  componentDidMount() {
    const event = this.props.location.state;
    this.props.getEventDetails(event.category, event.id);
    console.log("EVENT DETAILS DID MOUNT", this.props);
  }
  componentWillReceiveProps(nextProps) {
    // console.log("WILL RECEIVE PROPS", nextProps);
  }
  componentDidUpdate(prevProps) {
    // console.log(
    //   "DID UPDATEEEEEEEEEE EVENNNTNNTNTNTNTNTTN DETAILS",
    //   this.props.location.state,
    //   prevProps
    // );
    // const event = this.props.location.state;
    // this.props.getEventDetails(event.category, event.id);
  }

  onLeaveEvent(event, userId) {
    // console.log("LEAVE EVENT CLICKED", event, userId);
    this.props.leaveEvent(event._id, userId);
    this.setState(this.state);
  }
  onJoinEvent(event, userId) {
    // console.log("JOIN EVEN CLICKED EVENT", event, "USER ID", userId);
    const user = {
      id: userId
    };
    this.props.joinEvent(event._id, user);
    this.setState({
      showJoin: false
    });
  }
  renderMapHeader() {
    if (
      this.props.event.eventDetails === undefined ||
      this.props.event.eventDetails.length === 0
    ) {
      return null;
    } else {
      const event = this.props.event.eventDetails[0];
      return (
        <div className={styles.mapHeaderContainer}>
          <div className={styles.mapContainerHeaderDate}>
            <div className={styles.clock}>
              <FaRegClock size={25} color={"#82C4FF"} />
            </div>
            <div className={styles.dateAndTime}>
              <h1>{moment(event.eventDate).format("dddd, MMMM DD, YYYY")}</h1>

              <h1>
                {moment(event.timeStart).format("hh:mm A")} to{" "}
                {moment(event.timeEnd).format("hh:mm A")}
              </h1>
            </div>
          </div>
          <div className={styles.mapContainerHeaderLocation}>
            <div className={styles.markerIcon}>
              <FaMapMarkerAlt size={25} color={"#82C4FF"} />
            </div>
            <div className={styles.locationAddress}>
              <h1>{event.eventAddress}</h1>

              <a href={event.eventMapUrl} target="_blank">
                View map link
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
  renderMap() {
    // console.log("RENDER MAPPPPPP", window.google);
    if (
      this.props.event.eventDetails[0] === undefined ||
      this.props.event.eventDetails.length === 0
    ) {
      return null;
    } else if (this.props.event.eventDetails[0].eventLocation) {
      const { eventLocation } = this.props.event.eventDetails[0];

      const Marker = props => (
        <div>
          <FaMapMarkerAlt size={25} color={"#FF0000"} />
        </div>
      );

      return (
        <GoogleMapReact
          defaultCenter={eventLocation}
          defaultZoom={12}
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        >
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

    if (
      this.props.event.eventDetails[0] === undefined ||
      this.props.event.eventDetails.length === 0
    ) {
      return null;
    } else if (this.props.event.eventDetails[0].eventHost) {
      const event = this.props.event.eventDetails[0];
      return (
        <div>
          <div className={styles.detailsHeader}>
            <div className={styles.detailsHeaderHost}>
              <h1 className={styles.hostTitle}>Host</h1>

              <img
                src={event.eventHost.profileImg}
                alt="None"
                className={styles.hostImage}
              />
              <h1 className={styles.hostTitle}>
                {typeof event.eventHost !== "string"
                  ? event.eventHost.firstName.charAt(0).toUpperCase() +
                    event.eventHost.firstName.slice(1)
                  : null}
              </h1>
            </div>
            <div className={styles.detailsHeaderDesc}>
              <h1 className={styles.detailsCategory}>
                {event.eventCategory.toUpperCase()}
              </h1>

              <h1 className={styles.detailsTitle}>{event.eventTitle}</h1>
            </div>
          </div>
          <div className={styles.detailsMain}>
            <div className={styles.detailsMainTop}>
              <h1 className={styles.detailsMainTopTitle}>Description</h1>
              <h1 className={styles.detailsMainTopDesc}>
                Desc {event.eventDescription}
              </h1>
            </div>
            <div className={styles.detailsMainBottom}>
              <h1 className={styles.membersGoing}>
                Developers going - {event.eventAttendees.length}
              </h1>
              <div />
              {this.props.auth.user === undefined ||
              this.props.auth.user === "" ? null : this.props.auth.user[0]
                  ._id !== this.props.event.eventDetails[0].eventHost._id ? (
                <div>
                  <button
                    onClick={() =>
                      this.onJoinEvent(event, this.props.auth.user[0]._id)
                    }
                    className={styles.joinButton}
                  >
                    Join Event
                  </button>
                  <button
                    className={styles.leaveButton}
                    onClick={() =>
                      this.onLeaveEvent(event, this.props.auth.user[0]._id)
                    }
                  >
                    Leave Event
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    console.log("EVENT DETAILS PROPS", this.props, this.props.auth);

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.details}>{this.renderDetails()}</div>
          <div className={styles.mapContainer}>
            <div className={styles.mapContainerHeader}>
              {this.renderMapHeader()}
            </div>
            <div className={styles.map}>{this.renderMap()}</div>
          </div>
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
