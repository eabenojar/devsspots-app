const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");

const isUserAuth = (req, res, next) => {
  if (!req.user) {
    res.send("USER IS NOT LOGGED IN!!!!");
    res.redirect("/auth/login");
  } else {
    next();
  }
};

// Event Model
const Event = require("../models/Event");

// Event Routes

// Get all events
// Public Route
router.get("/", isUserAuth, (req, res) => {
  console.log("SUCCESS GET EVENTS");
  Event.find()
    .then(events => {
      res.json(events);
    })
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// Create an event
// Private Route
router.get("/new", isUserAuth, (req, res) => {
  console.log("EVENT POST");
  const title = "Test";
  const desc = "Decs Test";
  const newEvent = new Event({
    eventTitle: req.body.eventTitle || title,
    eventDescription: req.body.eventDescription || desc
    // eventCapacity: req.body.eventCapacity,
    // eventHost: req.body.eventHost,
    // eventLocation: req.body.eventLocation,
    // eventCategory: req.body.eventCategory,
    // timeStart: req.body.timeStart,
    // timeEnd: req.body.timeEnd,
    // eventDate: req.body.eventDate
  });
  newEvent
    .save()
    .then(event => res.json(event))
    .catch(err => console.log(err));
});

router.get(
  "/test",
  (req, res, next) => {
    console.log("THIS IS MIDDLEWARE ");
    next();
  },
  (req, res) => {
    res.json({ name: "Tim" });
  }
);

module.exports = router;
