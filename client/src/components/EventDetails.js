import React, { Component } from "react";
import { connect } from "react-redux";
import { getEventDetails } from "../actions/eventActions";

class EventDetails extends Component {
  componentDidMount() {
    console.log("EVENT DETAILS DID MOUNT", this.props);
  }
  render() {
    console.log("EVENT DETAILS PROPS", this.props);
    return (
      <div>
        <h1>Event Details</h1>
      </div>
    );
  }
}

export default connect(
  null,
  { getEventDetails }
)(EventDetails);
