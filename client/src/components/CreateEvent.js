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
import { fetchGoogleMaps } from "../actions/authAction";
import { Redirect, withRouter } from "react-router-dom";

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
      error: {},
      toHome: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.getValidationEvent = this.getValidationEvent.bind(this);
  }

  onScriptLoad() {
    console.log("ON SCRIPT LOAD CALL", window.google);
    // const map = new window.google.maps.Map(
    //   document.getElementById(this.props.id),
    //   this.props.options
    // );
    const map = new window.google.maps.LatLng(53.558572, 9.9278215);
    console.log("SCRIPT MAP", window.google);
    this.props.fetchGoogleMaps(window.google);
    this.setState({
      map
    });
    // this.props.onMapLoad(map);
  }
  componentDidMount() {
    console.log("DID MOUNT CREATE EVENT", window.google);
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_API_KEY
      }&libraries=places`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
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
    if (nextProps.event.event.length > 0) {
      console.log("ITS LITYYYYY");
      this.setState({
        toHome: true
      });
      // return <Redirect push to="/profile" />;
      // this.props.history.push("/");
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
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }
    const googleMap = this.props.auth.googleMaps.maps;
    console.log("RENDER REFESH MAP", googleMap);
    if (window.google !== undefined) {
      return (
        <div className={styles.main}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h1 className={styles.formTitle}>Create Event</h1>
            </div>

            <Form onSubmit={this.onSubmit} className={styles.form}>
              <FormGroup
                controlId="formHorizontalEmail"
                validationState={
                  this.props.error.eventTitle !== undefined ? "error" : null
                }
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
                  {this.props.error.eventTitle !== undefined ? (
                    <HelpBlock>{this.props.error.eventTitle}</HelpBlock>
                  ) : null}
                </Col>
              </FormGroup>

              <FormGroup
                controlId="formControlsSelect"
                validationState={
                  this.props.error.eventCategory !== undefined ? "error" : null
                }
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
                  <option name="eventCategory" value="react">
                    REACT
                  </option>
                  <option name="eventCategory" value="vue">
                    VUE
                  </option>
                  <option name="eventCategory" value="angular">
                    ANGULAR
                  </option>
                  <option name="eventCategory" value="nodejs">
                    NODEJS
                  </option>
                </FormControl>
                {this.props.error.eventCategory !== undefined ? (
                  <HelpBlock>{this.props.error.eventCategory}</HelpBlock>
                ) : null}
              </FormGroup>

              <FormGroup
                controlId="formHorizontalPassword"
                validationState={
                  this.props.error.eventDescription !== undefined
                    ? "error"
                    : null
                }
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
                {this.props.error.eventDescription !== undefined ? (
                  <HelpBlock>{this.props.error.eventDescription}</HelpBlock>
                ) : null}
              </FormGroup>
              <h1 className={styles.dateTitle}>Date </h1>
              {/* <div className={styles.datePickerWrapper}> */}
              {this.props.error.eventDate !== undefined ? (
                <div>
                  <DatePicker
                    className={styles.datePickerError}
                    selected={this.state.eventDate}
                    autoComplete="off"
                    type="hidden"
                    onChange={this.handleDateChange.bind(this, "eventDate")}
                    name="eventDate"
                    style={{ border: "1px solid red" }}
                    value={
                      this.state.eventDate.toString() === ""
                        ? ""
                        : moment(this.state.eventDate).format(
                            "dddd, MMMM DD, YYYY"
                          )
                    }
                  />
                  <p className={styles.dateErrorTitle}>
                    {this.props.error.eventDate}
                  </p>
                </div>
              ) : (
                <DatePicker
                  className={styles.datePicker}
                  selected={this.state.eventDate}
                  autoComplete="off"
                  type="hidden"
                  onChange={this.handleDateChange.bind(this, "eventDate")}
                  name="eventDate"
                  style={{ border: "1px solid red" }}
                  value={
                    this.state.eventDate.toString() === ""
                      ? ""
                      : moment(this.state.eventDate).format(
                          "dddd, MMMM DD, YYYY"
                        )
                  }
                />
              )}

              {/* </div> */}

              <h1 className={styles.timeTitle}>Time Picker</h1>
              {this.props.error.timeStart !== undefined ? (
                <div className={styles.timePickerWrapper}>
                  <DatePicker
                    selected={this.state.startDate}
                    className={styles.dateTimePickerError}
                    onChange={this.handleTimeChange.bind(this, "timeStart")}
                    showTimeSelect
                    showTimeSelectOnly
                    autoComplete="off"
                    type="hidden"
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
                  <p className={styles.timeErrorTitle}>
                    {this.props.error.timeStart}
                  </p>
                </div>
              ) : (
                <div className={styles.timePickerWrapper}>
                  <DatePicker
                    selected={this.state.startDate}
                    className={styles.dateTimePicker}
                    onChange={this.handleTimeChange.bind(this, "timeStart")}
                    showTimeSelect
                    showTimeSelectOnly
                    autoComplete="off"
                    type="hidden"
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
              )}
              {this.props.error.timeEnd !== undefined ? (
                <div className={styles.timePickerWrapper}>
                  <DatePicker
                    selected={this.state.startDate}
                    className={styles.dateTimePickerError}
                    onChange={this.handleTimeChange.bind(this, "timeEnd")}
                    showTimeSelect
                    showTimeSelectOnly
                    autoComplete="off"
                    type="hidden"
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
                  <p className={styles.timeErrorTitle}>
                    {this.props.error.timeEnd}
                  </p>
                </div>
              ) : (
                <div className={styles.timePickerWrapper}>
                  <DatePicker
                    selected={this.state.startDate}
                    className={styles.dateTimePicker}
                    onChange={this.handleTimeChange.bind(this, "timeEnd")}
                    showTimeSelect
                    showTimeSelectOnly
                    autoComplete="off"
                    type="hidden"
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
              )}

              <h1 className={styles.timeTitle}>Location (Address)</h1>
              {this.props.error.eventAddress !== undefined &&
              window.google !== undefined ? (
                <div className={styles.geoForm}>
                  <Geosuggest
                    className={styles.geoFormError}
                    ref={el => (this._geoSuggest = el)}
                    placeholder="Start typing!"
                    // initialValue="San Francisco"
                    onSuggestSelect={this.onSuggestSelect}
                    suggestsHiddenClassName={styles.geoformHidden}
                    suggestItemClassName={styles.geoformActive}
                    location={
                      window.google !== undefined
                        ? new window.google.maps.LatLng(53.558572, 9.9278215)
                        : null
                    }
                    radius="20"
                  />
                  <p className={styles.mapErrorTitle}>
                    {this.props.error.eventAddress}
                  </p>
                </div>
              ) : (
                <div className={styles.geoForm}>
                  <Geosuggest
                    className={styles.geoForm}
                    ref={el => (this._geoSuggest = el)}
                    placeholder="Start typing!"
                    // initialValue="San Francisco"
                    onSuggestSelect={this.onSuggestSelect}
                    suggestsHiddenClassName={styles.geoformHidden}
                    suggestItemClassName={styles.geoformActive}
                    location={
                      window.google !== undefined
                        ? new window.google.maps.LatLng(53.558572, 9.9278215)
                        : null
                    }
                    radius="20"
                  />
                </div>
              )}

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
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    error: state.error,
    event: state.event
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { addEvent, fetchGoogleMaps }
  )(CreateEvent)
);
