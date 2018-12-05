import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
import { getCategoryEvents } from "../actions/eventActions";

class CategoryEvents extends Component {
  componentDidMount() {
    console.log("DID MOUNT CATEGORY EVENT PAGE", this.props);
    const category = this.props.location.state;
    this.props.getCategoryEvents(category);
  }
  renderEvents() {
    if (this.props.event.categoryEvents.length === 0) {
      return null;
    } else if (this.props.event.categoryEvents.length > 0) {
      const events = this.props.event.categoryEvents;
      return (
        <div>
          {events.map((event, index) => {
            return (
              <div key={index}>
                <h1>{event.eventTitle}</h1>
              </div>
            );
          })}
        </div>
      );
    }
  }
  render() {
    console.log("CATEGORY EVENTS RENDER", this.props);
    return (
      <div>
        <h1>CategoryEvents</h1>
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
