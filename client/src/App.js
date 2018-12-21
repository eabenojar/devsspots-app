import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import routes from "./router";
import { fetchUser, fetchGoogleMaps } from "./actions/authAction";

import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null
    };
    this.onScriptLoad = this.onScriptLoad.bind(this);
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
    this.props.fetchUser();
    console.log("DID MOUNT CREATE EVENT", window.google);
    // if (!window.google) {
    //   var s = document.createElement("script");
    //   s.type = "text/javascript";
    //   s.src = `https://maps.googleapis.com/maps/api/js?key=${
    //     process.env.REACT_APP_API_KEY
    //   }&libraries=places`;
    //   var x = document.getElementsByTagName("script")[0];
    //   x.parentNode.insertBefore(s, x);
    //   // Below is important.
    //   //We cannot access google.maps until it's finished loading
    //   s.addEventListener("load", e => {
    //     this.onScriptLoad();
    //   });
    // } else {
    //   this.onScriptLoad();
    // }
  }

  render() {
    console.log("RENDER APPJS PROPS", this.props);
    return (
      <Router>
        <div className="App">
          <Header />
          {routes}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    event: state.event
  };
};

export default connect(
  mapStateToProps,
  { fetchUser, fetchGoogleMaps }
)(App);
