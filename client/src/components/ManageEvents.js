import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserEvents, deleteEvent } from "../actions/eventActions";
import { Row, Grid, Col } from "react-bootstrap";
import styles from "../styles/css/ManageEvents.module.css";
import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";

class ManageEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHosted: true,
      hosted: true,
      attended: false
    };
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
    this.onshowAttended = this.onshowAttended.bind(this);
    this.onshowHosted = this.onshowHosted.bind(this);
  }
  componentDidMount() {
    const userId = this.props.auth.user[0]._id;
    console.log("DID MOUNT USER ID", userId);
    this.props.getUserEvents(userId);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("WILL RECEIVE UPDATE PROPS", nextProps);
  }
  onDeleteEvent(event) {
    console.log("DELETE EVENT INFO", event);
    this.props.deleteEvent(event._id);
  }
  onshowAttended() {
    this.setState({
      showHosted: false,
      attended: true,
      hosted: false
    });
  }
  onshowHosted() {
    this.setState({
      showHosted: true,
      hosted: true,
      attended: false
    });
  }
  render() {
    console.log("MANAGE EVENTS PROPS", this.props);
    const { event } = this.props;
    let eventContent;

    if (event === null) {
      eventContent = <h1>Loading...</h1>;
    } else {
      eventContent = (
        <div>
          <div className={styles.eventHeader}>
            <button
              onClick={this.onshowHosted}
              className={styles.eventHeaderButton}
              style={{
                backgroundColor: this.state.hosted ? "#313131" : "#FFF",
                color: this.state.attended ? "#000" : "#fff"
              }}
            >
              Events Hosted
            </button>
            <button
              onClick={this.onshowAttended}
              className={styles.eventHeaderButton}
              style={{
                backgroundColor: this.state.attended ? "#313131" : "#FFF",
                color: this.state.attended ? "#FFF" : "#000"
              }}
            >
              Events Attended
            </button>
          </div>
          {this.state.showHosted
            ? event.eventsHosted.map((event, index) => {
                return (
                  <div className={styles.box} key={index}>
                    <div className={styles.manageEventsDesc}>
                      <h1 className={styles.date}>
                        {moment(event.eventDate).format("MMMM, DD YYYY")}
                      </h1>
                      <h1 className={styles.title}>{event.eventTitle}</h1>
                      <h1 className={styles.going}>
                        {" "}
                        Members going {event.eventAttendees.length}
                      </h1>
                    </div>
                    <div className={styles.manageEventDelete}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => this.onDeleteEvent(event)}
                      >
                        <FaTrashAlt
                          color={"#5A5A5A"}
                          style={{ backgroundColor: "transparent" }}
                        />
                      </button>
                    </div>
                  </div>
                );
              })
            : event.eventsAttended.map((event, index) => {
                return (
                  <div className={styles.box} key={index}>
                    <div className={styles.manageEventsDesc}>
                      <h1 className={styles.date}>
                        {moment(event.eventDate).format("MMMM, DD YYYY")}
                      </h1>
                      <h1 className={styles.title}>{event.eventTitle}</h1>
                      <h1 className={styles.going}>
                        {" "}
                        Members going {event.eventAttendees.length}
                      </h1>
                    </div>
                    <div className={styles.manageEventDelete}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => this.onDeleteEvent(event)}
                      >
                        <FaTrashAlt
                          color={"#5A5A5A"}
                          style={{ backgroundColor: "transparent" }}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      );
    }
    return <div className={styles.manageEventsContainer}>{eventContent}</div>;
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
  { getUserEvents, deleteEvent }
)(ManageEvents);
