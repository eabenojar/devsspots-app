import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserEvents } from "../actions/eventActions";

class ManageEvents extends Component {
  componentDidMount() {
    const userId = this.props.auth.user[0]._id;
    console.log("DID MOUNT USER ID", userId);
    this.props.getUserEvents(userId);
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("WILL RECEIVE UPDATE PROPS", nextProps);
  }
  render() {
    console.log("MANAGE EVENTS PROPS", this.props);
    console.log("WINDOW MANAGAE STATE", window);
    const { event } = this.props;
    let eventContent;

    if (event === null) {
      eventContent = <h1>Loading...</h1>;
    } else {
      eventContent = (
        <div>
          {event.eventsHosted.map((event, index) => {
            return (
              <div key={index}>
                <h1>{event.eventTitle}</h1>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div>
        <h1>Manage Events</h1>
        {eventContent}
      </div>
    );
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
  { getUserEvents }
)(ManageEvents);
