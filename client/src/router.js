import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import CategoryEvents from "./components/CategoryEvents";
import ProfilePage from "./components/ProfilePage";

export default (
  <Switch>
    <Route component={HomePage} exact path="/" />
    <Route component={LoginPage} exact path="/login" />
    <Route component={CategoryEvents} exact path="/event/:category" />
    <Route component={ProfilePage} exact path="/profile" />
  </Switch>
);
