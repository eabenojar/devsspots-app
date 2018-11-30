const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("mongoose");

// Event Model
const Event = require("../models/Event");

// Event Routes

// Get all events
// Public Route
router.get("/", (req, res) => {
  Event.find()
    .then(events => {
      res.json(events);
    })
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// Create an event
// Private Route
router.post("/new", authenticate, (req, res) => {
  const newEvent = new Event({
    eventTitle: req.body.eventTitle,
    eventDescription: req.body.eventDescription,
    eventCapacity: req.body.eventCapacity,
    eventHost: req.body.eventHost,
    eventLocation: req.body.eventLocation,
    eventCategory: req.body.eventCategory,
    timeStart: req.body.timeStart,
    timeEnd: req.body.timeEnd,
    eventDate: req.body.eventDate
  });
  newEvent
    .save()
    .then(event => res.json(event))
    .catch(err => console.log(err));
});
