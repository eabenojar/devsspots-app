import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserEvents } from "../actions/eventActions";

class ManageEvents extends Component {
  componentDidMount() {
    const userId = this.props.auth.user._id;
    console.log("DID MOUNT USER ID", userId);
    this.props.getUserEvents(userId);
  }
  render() {
    console.log("MANAGE EVENTS PROPS", this.props);
    return (
      <div>
        <h1>Manage Events</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.events,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getUserEvents }
)(ManageEvents);
