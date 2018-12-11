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
                <h1>{event.eventTitle}</h1>
                <h1>{moment(event.eventDate).format("MM-DD-YYYY")}</h1>
                <h1>{moment(event.timeStart).format("hh:mm A")}</h1>
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
        <h1>
          {this.props.location.state.charAt(0).toUpperCase() +
            this.props.location.state.slice(1)}
          Study Groups
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
