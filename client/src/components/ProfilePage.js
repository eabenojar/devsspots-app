import React, { Component } from "react";
import { connect } from "react-redux";
import CreateEvent from "./CreateEvent";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEventForm: false
    };
    this.renderProfile = this.renderProfile.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }
  renderProfile() {
    console.log("RENDER PROFILE");
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
  render() {
    console.log("PROFILE PROPS", this.props.auth.user[0]);
    return (
      <div>
        <h1>Profile page </h1>
        {this.renderProfile()}
        <button onClick={this.createEvent}>Create Event</button>
        {this.state.showEventForm === false ? null : <CreateEvent />}
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
