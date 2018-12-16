import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import CategoryEvents from "./components/CategoryEvents";
import ProfilePage from "./components/ProfilePage";
import CreateEvent from "./components/CreateEvent";
import EventDetails from "./components/EventDetails";
import EditEvent from "./components/EditEvent";

export default (
  <Switch>
    <Route component={HomePage} exact path="/" />
    <Route component={LoginPage} exact path="/login" />
    <Route component={CategoryEvents} exact path="/event/:category" />
    <Route component={ProfilePage} exact path="/profile" />
    <Route component={CreateEvent} exact path="/user/event" />
    <Route component={EventDetails} exact path="/event/:category/:id" />
    <Route component={EditEvent} exact path="/profile/edit/:id" />
  </Switch>
);
