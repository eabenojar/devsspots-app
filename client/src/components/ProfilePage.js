import React, { Component } from "react";
import { connect } from "react-redux";
// Components
import ManageEvents from "./ManageEvents";
import CreateEvent from "./CreateEvent";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEventForm: false,
      manageEvents: false
    };
    this.renderProfile = this.renderProfile.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.onManageEvents = this.onManageEvents.bind(this);
  }
  renderProfile() {
    if (this.props.auth.user[0]) {
      const { profileImg, firstName } = this.props.auth.user[0];
      return (
        <div>
          <h1>{firstName}</h1>
          <img src={profileImg} alt="" />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Put Spinner here...</h1>
        </div>
      );
    }
  }
  createEvent() {
    this.setState({
      showEventForm: true
    });
  }
  onManageEvents() {
    this.setState({
      manageEvents: true
    });
  }
  render() {
    console.log("PROFILE PROPS", this.props.auth.user[0]);
    return (
      <div>
        <h1>Profile page </h1>
        {this.renderProfile()}
        <button onClick={this.createEvent}>Create Event</button>
        <button onClick={this.onManageEvents}>Manage Events</button>
        {this.state.showEventForm === false ? null : <CreateEvent />}
        {this.state.manageEvents === false ? null : <ManageEvents />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {}
)(ProfilePage);
