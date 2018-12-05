import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Col,
  Checkbox,
  Button
} from "react-bootstrap";

import { connect } from "react-redux";
import { addEvent } from "../actions/eventActions";

class CreateEvent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: "",
      eventTitle: "",
      eventDescription: "",
      eventCategory: "html"
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }
  onSubmit(e) {
    e.preventDefault();
    const newEvent = {
      eventTitle: this.state.eventTitle,
      eventDescription: this.state.eventDescription,
      eventHost: this.props.auth.user[0]._id,
      eventCategory: this.state.eventCategory
    };
    this.props.addEvent(newEvent);
  }
  handleChange(e) {
    console.log("CHANGE", e.target.value, "Name", e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    console.log("CREATE EVENT PROPS", this.props);
    return (
      <div>
        <h1>Create Event</h1>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Event Title
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Title"
                name="eventTitle"
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Event Description
            </Col>
            <Col sm={10}>
              <FormControl
                componentClass="textarea"
                placeholder="Description"
                name="eventDescription"
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              <ControlLabel>Category</ControlLabel>
            </Col>
            <Col sm={10}>
              {/* <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.handleChange.bind(this)}
              > */}
              <select onChange={this.handleChange.bind(this)}>
                <option name="eventCategory" value="html">
                  HTML
                </option>
                <option name="eventCategory" value="css">
                  CSS
                </option>
                <option name="eventCategory" value="javascript">
                  JAVASCRIPT
                </option>
              </select>
            </Col>
          </FormGroup>

          {/* <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Event Capacity
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Event Location
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Event Category
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Password" />
            </Col>
          </FormGroup>

          

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Start Time
            </Col>
            <Col sm={10}>
              <FormControl type="time" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              End Time
            </Col>
            <Col sm={10}>
              <FormControl type="datetime-local" placeholder="Password" />
            </Col>
          </FormGroup>
*/}
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Create Event</Button>
            </Col>
          </FormGroup>
        </Form>
        ;
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
  { addEvent }
)(CreateEvent);
