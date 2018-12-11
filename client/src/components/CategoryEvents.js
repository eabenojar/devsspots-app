import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { getCategoryEvents } from "../actions/eventActions";
import moment from "moment";
import styles from "../styles/css/CategoryEvents.module.css";

class CategoryEvents extends Component {
  componentDidMount() {
    console.log("DID MOUNT CATEGORY EVENT PAGE", this.props);
    const category = this.props.location.state;
    this.props.getCategoryEvents(category);
    this.getEventDetails = this.getEventDetails.bind(this);
  }
  renderEvents() {
    if (this.props.event.categoryEvents.length === 0) {
      return null;
    } else if (this.props.event.categoryEvents.length > 0) {
      const events = this.props.event.categoryEvents;
      return (
        <div className={styles.container}>
          {events.map((event, index) => {
            return (
              <div
                key={index}
                className={styles.box}
                onClick={() => this.getEventDetails(event)}
              >
                <div className={styles.boxLeft}>
                  <h1 className={styles.boxLeftCategory}>
                    {event.eventCategory.toUpperCase()}
                  </h1>
                  <h1 className={styles.boxLeftTime}>
                    {moment(event.timeStart).format("hh:mm A")}
                  </h1>
                </div>
                <div className={styles.boxRight}>
                  <h1 className={styles.boxRightDate}>
                    {moment(event.eventDate).format("MMMM, DD YYYY")}
                  </h1>
                  <h1 className={styles.boxRightTitle}>{event.eventTitle}</h1>
                  <h1 className={styles.boxRightMembers}>
                    Members going {event.eventAttendees.length}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
  getEventDetails(event) {
    console.log("EVENT DETAILS", event);
    this.props.history.push({
      pathname: `/event/${event.eventCategory}/${event._id}`,
      state: {
        id: event._id,
        category: event.eventCategory
      }
    });
  }
  render() {
    console.log("CATEGORY EVENTS RENDER", this.props);
    return (
      <div className={styles.main}>
        <h1 className={styles.mainTitle}>
          {this.props.location.state.charAt(0).toUpperCase() +
            this.props.location.state.slice(1).toUpperCase() +
            " "}
          STUDY GROUPS
        </h1>
        {this.renderEvents()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.event
  };
};

export default connect(
  mapStateToProps,
  { getCategoryEvents }
)(CategoryEvents);
