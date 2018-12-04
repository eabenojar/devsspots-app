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

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ""
    };
  }
  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    return (
      <div>
        <h1>Create Event</h1>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Event Title
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Event Description
            </Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" placeholder="textarea" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
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

          <FormGroup controlId="formControlsSelect">
            <Col componentClass={ControlLabel} sm={2}>
              <ControlLabel>Category</ControlLabel>
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" placeholder="select">
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JAVASCRIPT</option>
              </FormControl>
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

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
        ;
      </div>
    );
  }
}

export default connect(
  null,
  { addEvent }
)(CreateEvent);
