const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isUserAuth = require("../middleware/userAuth");

// Event Model
const Event = require("../models/Event");
const User = require("../models/User");

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

// Get all user's events
// Private route

router.get("/:id", isUserAuth, (req, res) => {
  console.log("GOT TO SERVER FOR GET USER EVENTS", req.params.id);
  User.findById(req.params.id)
    .populate("eventsHosted")
    .then(user => {
      if (user) {
        res.json(user);
      }
    });
});

// Create an event
// Private Route
router.post("/new", isUserAuth, (req, res) => {
  const userId = req.user._id;
  console.log("EVENT POST SERVER", req.user[0]._id, req.user[0]);
  const newEvent = new Event({
    eventTitle: req.body.eventTitle,
    eventDescription: req.body.eventDescription,
    eventHost: req.body.eventHost
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
    .then(event => {
      console.log("SUCCES USER ID", req.user.id, userId);

      User.findById(req.user[0]._id).then(user => {
        console.log("GOT THE USER FROM POST EVENT", user);
        user.eventsHosted.push(event._id);
        user.save();
      });
      res.json(event);
    })
    .catch(err => console.log(err));
});

// Delete event
// Private route

router.delete("/:id", isUserAuth, (req, res) => {
  console.log("SERVER DELETE REQ", req.user, "SERVER EVENT ID", req.params.id);
});

// Update event
// Private route

router.patch("/:id", isUserAuth, (req, res) => {
  Event.findOne({});
});

module.exports = router;
