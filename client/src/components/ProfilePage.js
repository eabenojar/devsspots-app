import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../styles/css/ProfilePage.module.css";

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
      const {
        profileImg,
        firstName,
        lastName,
        eventsAttended,
        eventsHosted
      } = this.props.auth.user[0];
      return (
        <div>
          <div className={styles.profileDetailsHeader}>
            <img src={profileImg} alt="" className={styles.profileImage} />
            <h1 className={styles.name}>
              {firstName} {lastName}
            </h1>
          </div>
          <div className={styles.profileDetailsEvents}>
            <div>
              <h1>{eventsAttended.length}</h1>
              <h1 className={styles.eventsAttended}>Events Attended</h1>
            </div>
            <div>
              <h1>{eventsHosted.length}</h1>
              <h1 className={styles.eventsHosted}>Events Hosted</h1>
            </div>
          </div>
          <div className={styles.profileDetailsButtons}>
            <Link to="/user/event">
              <button type="button">Create Event</button>
            </Link>
            <Link to="/user/events">
              <button type="button">Manage Events</button>
            </Link>
          </div>
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
    if (this.props.auth.user[0]) {
      return <ManageEvents />;
    } else {
      return null;
    }
  }
  render() {
    console.log("PROFILE PROPS", this.props);
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileDetails}>{this.renderProfile()}</div>
        <div className={styles.profileEvents}>{this.onManageEvents()}</div>
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
