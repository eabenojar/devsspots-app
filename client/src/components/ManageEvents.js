import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserEvents, deleteEvent } from "../actions/eventActions";
import { Row, Grid, Col } from "react-bootstrap";
import styles from "../styles/css/ManageEvents.module.css";

class ManageEvents extends Component {
  constructor(props) {
    super(props);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
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
          <Grid>
            <Row>
              {event.eventsHosted.map((event, index) => {
                return (
                  <Col xs={12} sm={6} md={4} lg={4} key={index}>
                    <div className={styles.box}>
                      <div>
                        <h1>{event.eventTitle}</h1>
                      </div>
                      <div>
                        <button onClick={() => this.onDeleteEvent(event)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Grid>
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
  { getUserEvents, deleteEvent }
)(ManageEvents);
