import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserEvents, deleteEvent } from "../actions/eventActions";
import { Row, Grid, Col } from "react-bootstrap";
import styles from "../styles/css/ManageEvents.module.css";
import { FaTrashAlt } from "react-icons/fa";

class ManageEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHosted: true
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
      showHosted: false
    });
  }
  onshowHosted() {
    this.setState({
      showHosted: true
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
            >
              Events Hosted
            </button>
            <button
              onClick={this.onshowAttended}
              className={styles.eventHeaderButton}
            >
              Events Attended
            </button>
          </div>
          {this.state.showHosted
            ? event.eventsHosted.map((event, index) => {
                return (
                  <div className={styles.box} key={index}>
                    <div>
                      <h1>{event.eventTitle}</h1>
                    </div>
                    <div>
                      <button onClick={() => this.onDeleteEvent(event)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                );
              })
            : event.eventsAttended.map((event, index) => {
                return (
                  <div className={styles.box} key={index}>
                    <div>
                      <h1>{event.eventTitle}</h1>
                    </div>
                    <div>
                      <button onClick={() => this.onDeleteEvent(event)}>
                        Delete
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
