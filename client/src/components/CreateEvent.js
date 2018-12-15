/* eslint-disable no-undef */
import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  Col,
  Checkbox,
  Button,
  HelpBlock
} from "react-bootstrap";

import { connect } from "react-redux";
import { addEvent } from "../actions/eventActions";
import Geosuggest from "react-geosuggest";
import styles from "../styles/css/CreateEvent.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class CreateEvent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: "",
      eventTitle: "",
      eventDescription: "",
      eventCategory: "",
      eventLocation: {},
      eventAddress: "",
      eventMapUrl: "",
      eventDate: new Date(),
      timeStart: "",
      timeEnd: "",
      map: null,
      error: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.getValidationEvent = this.getValidationEvent.bind(this);
  }
  componentDidMount() {
    console.log("DID MOUNT CREAT EVENT", window.g);
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }
  componentWillReceiveProps(nextProps) {
    console.log("WILL RECEIEVE", nextProps);
    if (Object.keys(nextProps.error).length !== 0) {
      this.setState({ error: nextProps.error });
    }
  }
  getValidationEvent() {
    console.log("GET VALIDATION METHODDSSSSSS", this.state.error);
    if (Object.keys(this.state.error).length === 0) {
      return null;
    } else {
      return "error";
    }
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
      eventMapUrl: this.state.eventMapUrl,
      timeStart: this.state.timeStart,
      timeEnd: this.state.timeEnd,
      eventDate: this.state.eventDate
    };
    this.props.addEvent(newEvent);
  }
  onSuggestSelect(suggest) {
    console.log("SUGGGGESST", suggest);
    if (window.google && suggest !== undefined) {
      const location = suggest.location;
      const address = suggest.gmaps.formatted_address;
      const mapUrl = suggest.gmaps.url;
      this.setState({
        eventAddress: address,
        eventLocation: location,
        eventMapUrl: mapUrl
      });
    }

    console.log("SELECTING GOOGLE", suggest);
  }
  onOptionChange(e) {
    this.setState({
      eventCategory: e.target.value
    });
  }
  handleTimeChange(name, time) {
    console.log("DATE OR TIME", name);
    // const timeFormatted = moment(time).format("hh:mm A");
    // console.log("FORMATED", timeFormatted);
    this.setState({
      [name]: time.toString()
    });
  }
  handleDateChange(name, date) {
    this.setState({
      [name]: date
    });
  }
  handleChange(e) {
    console.log("CHANGE", e.target.value, "Name", e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    console.log("CREATE EVENT RENDER MAP", window.google);
    console.log("CREATE EVENT PROPSSSSS", this.props);
    console.log(
      "CHECK TIME CREATE EVENT",
      moment(this.state.timeEnd).format("hh:mm A"),
      this.state.timeEnd
    );
    var fixtures = [
      {
        label: "San Francisco, CA",
        location: { lat: 53.5459, lng: 9.966576 }
      },
      {
        label: "New York, NY",
        location: { lat: 53.5495629, lng: 9.9625838 }
      },
      {
        label: "Austin, TX",
        location: { lat: 53.5610398, lng: 10.0259135 }
      }
    ];
    const googleMap = this.props.auth.googleMaps.maps;
    console.log("RENDER REFESH MAP", googleMap);
    return (
      <div className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Create Event</h1>
          </div>

          <Form onSubmit={this.onSubmit} className={styles.form}>
            <FormGroup
              controlId="formHorizontalEmail"
              validationState={this.getValidationEvent()}
            >
              <Col>
                <ControlLabel className={styles.inputEventTitle}>
                  Event Title
                </ControlLabel>
              </Col>
              <Col>
                <FormControl
                  type="text"
                  placeholder="Title"
                  name="eventTitle"
                  onChange={this.handleChange}
                  className={styles.inputTitle}
                  maxLength={60}
                />
                <HelpBlock>Help text with validation state.</HelpBlock>
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formControlsSelect"
              validationState={this.getValidationEvent()}
            >
              <ControlLabel className={styles.inputEventCategory}>
                Category
              </ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.onOptionChange.bind(this)}
              >
                <option name="eventCategory" value="">
                  SELECT
                </option>
                <option name="eventCategory" value="html">
                  HTML
                </option>
                <option name="eventCategory" value="css">
                  CSS
                </option>
                <option name="eventCategory" value="javascript">
                  JAVASCRIPT
                </option>
              </FormControl>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalPassword"
              validationState={this.getValidationEvent()}
            >
              <ControlLabel className={styles.inputEventDesc}>
                Event Description
              </ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Description"
                name="eventDescription"
                onChange={this.handleChange}
                maxLength={160}
              />
            </FormGroup>
            <h1 className={styles.dateTitle}>Date </h1>
            <div className={styles.datePickerWrapper}>
              <DatePicker
                className={styles.datePicker}
                selected={this.state.eventDate}
                onChange={this.handleDateChange.bind(this, "eventDate")}
                name="eventDate"
                value={
                  this.state.eventDate.toString() === ""
                    ? ""
                    : moment(this.state.eventDate).format("dddd, MMMM DD, YYYY")
                }
              />
            </div>

            <h1 className={styles.timeTitle}>Time Picker</h1>
            <div className={styles.timePickerWrapper}>
              <DatePicker
                selected={this.state.startDate}
                className={styles.dateTimePicker}
                onChange={this.handleTimeChange.bind(this, "timeStart")}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                timeCaption="Time"
                name="timeStart"
                value={
                  this.state.timeStart === ""
                    ? ""
                    : moment(this.state.timeStart).format("hh:mm A")
                }
              />
            </div>
            <div className={styles.timePickerWrapper}>
              <DatePicker
                selected={this.state.startDate}
                className={styles.dateTimePicker}
                onChange={this.handleTimeChange.bind(this, "timeEnd")}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="h:mm"
                timeCaption="Time"
                name="timeEnd"
                value={
                  this.state.timeEnd === ""
                    ? ""
                    : moment(this.state.timeEnd).format("hh:mm A")
                }
              />
            </div>

            <h1 className={styles.timeTitle}>Location (Address)</h1>

            <div className={styles.geoForm}>
              <Geosuggest
                className={styles.geoForm}
                ref={el => (this._geoSuggest = el)}
                placeholder="Start typing!"
                // initialValue="San Francisco"
                fixtures={fixtures}
                onSuggestSelect={this.onSuggestSelect}
                suggestsHiddenClassName={styles.geoformHidden}
                suggestItemClassName={styles.geoformActive}
                location={new googleMap.LatLng(53.558572, 9.9278215)}
                radius="20"
              />
            </div>

            <FormGroup>
              <Col>
                <Button type="submit" className={styles.createEventButton}>
                  Create Event
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    error: state.error,
    event: state.event
  };
};
export default connect(
  mapStateToProps,
  { addEvent }
)(CreateEvent);
