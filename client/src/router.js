import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

export default (
  <Switch>
    <Route component={HomePage} exact path="/" />
    <Route component={LoginPage} exact path="/login" />
  </Switch>
);
