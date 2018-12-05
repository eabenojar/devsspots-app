/* eslint-disable no-undef */
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
import Geosuggest from "react-geosuggest";
import styles from "../styles/css/CreateEvent.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateEvent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: "",
      eventTitle: "",
      eventDescription: "",
      eventCategory: "html",
      eventLocation: {},
      eventAddress: "",
      eventMapUrl: "",
      map: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
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
      eventCategory: this.state.eventCategory,
      eventLocation: this.state.eventLocation,
      eventAddress: this.state.eventAddress,
      eventMapUrl: this.state.eventMapUrl
    };
    this.props.addEvent(newEvent);
  }
  onSuggestSelect(suggest) {
    const location = suggest.location;
    const address = suggest.gmaps.formatted_address;
    const mapUrl = suggest.gmaps.url;
    this.setState({
      eventAddress: address,
      eventLocation: location,
      eventMapUrl: mapUrl
    });
    console.log("SELECTING GOOGLE", suggest);
  }
  onOptionChange(e) {
    this.setState({
      eventCategory: e.target.value
    });
  }
  handleChange(e) {
    console.log("CHANGE", e.target.value, "Name", e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    console.log("CREATE EVENT RENDER MAP", window.google);
    var fixtures = [
      // {
      //   label: "San Francisco, CA",
      //   location: { lat: 53.5459, lng: 9.966576 }
      // },
      // {
      //   label: "New York, NY",
      //   location: { lat: 53.5495629, lng: 9.9625838 }
      // },
      // {
      //   label: "Austin, TX",
      //   location: { lat: 53.5610398, lng: 10.0259135 }
      // }
    ];
    return (
      <div className={styles.main}>
        <h1>Create Event</h1>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
        <div className={styles.geoForm}>
          <Geosuggest
            ref={el => (this._geoSuggest = el)}
            placeholder="Start typing!"
            // initialValue="San Francisco"
            fixtures={fixtures}
            onSuggestSelect={this.onSuggestSelect}
            location={new window.google.maps.LatLng(53.558572, 9.9278215)}
            radius="20"
          />
        </div>
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
              <select onChange={this.onOptionChange.bind(this)}>
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
