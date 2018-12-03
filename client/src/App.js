import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import routes from "./router";
import { fetchUser } from "./actions/authAction";

import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchUser();
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
    state
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
