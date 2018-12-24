const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isUserAuth = require("../middleware/userAuth");

const validateEvent = require("../validation/event");

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
    .populate("eventsAttended")
    .then(user => {
      console.log("WE GOT IT FAM", user);
      if (user) {
        res.json(user);
      }
    });
});

// Get all events per category
// Public route
router.get("/category/:category", (req, res) => {
  console.log("CATERGORY PARAMS", req.params.category);
  Event.find({ eventCategory: req.params.category })
    .sort({ eventDate: 1 })
    .sort({ timeStart: 1 })
    .then(events => {
      if (events) {
        res.json(events);
      }
      console.log("SUCCESS GOT EM", events);
    });
});

// Get event details
// Public Route
router.get("/category/:category/:id", (req, res) => {
  console.log("HIT SEVER ROUTE EVENT DETAILS");
  Event.findById(req.params.id)
    .populate("eventAttendees")
    .populate("eventHost")
    .then(event => {
      console.log("WE GOT THE EVENT SERVER", event);
      if (event) {
        res.json(event);
      }
    });
});

// Create an event
// Private Route
router.post("/new", isUserAuth, (req, res) => {
  const userId = req.user._id;
  // Check Validation
  const { errors, isValid } = validateEvent(req.body);

  if (!isValid) {
    console.log("ERRORS IN CREATE EVENT", errors);
    return res.status(400).json(errors);
  }
  console.log("EVENT POST SERVER", req.user[0]._id, req.user[0]);
  const newEvent = new Event({
    eventTitle: req.body.eventTitle,
    eventDescription: req.body.eventDescription,
    eventHost: req.body.eventHost,
    // eventCapacity: req.body.eventCapacity,
    eventLocation: req.body.eventLocation,
    eventAddress: req.body.eventAddress,
    eventCategory: req.body.eventCategory,
    eventMapUrl: req.body.eventMapUrl,
    timeStart: req.body.timeStart,
    timeEnd: req.body.timeEnd,
    eventDate: req.body.eventDate
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
  console.log("GOT TO SERVER DELETE", req.params.id);
  Event.findByIdAndRemove(req.params.id).then(event => {
    console.log("EVENT DELETED", event, event._id);
    if (event) {
      User.findByIdAndUpdate(
        { _id: event.eventHost },
        {
          $pull: { eventsHosted: event._id }
        },
        { new: true }
      ).then(userUpdate => {
        console.log("USER EVENTSSSSS", userUpdate);
        User.find({ eventsAttended: { $in: [event._id] } })
          .then(user => {
            console.log("USERS THAT WENT TO EVENT SERVER", user.length);
            if (user.length === 1) {
              user[0].eventsAttended = user[0].eventsAttended.filter(
                eventId => eventId !== req.params.id
              );
              console.log("FILTER EVENT", user);
              user
                .save()
                .then(user => console.log("SUCCESS EVENT DELETE", user));
            } else {
              users = users.map(user => {
                user.eventsAttended = user.eventsAttended.filter(
                  eventId => eventId !== req.params.id
                );
              });
              users
                .save()
                .then(users => console.log("ALL USERS EVENTS DELETED", users));
            }
          })
          .catch(err => console.log("ERRORROROROROORO", err));
      });
    }
    res.json(event);
  });
});

// Update event
// Private route

router.patch("/update/:id", isUserAuth, (req, res) => {
  console.log("SERVER UPDATE EVENT", req.body);
  const { errors, isValid } = validateEvent(req.body);

  if (!isValid) {
    console.log("ERRORS IN EDIT EVENT", errors);
    return res.status(400).json(errors);
  } else {
    Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(event => {
        console.log("UPDATED EVENT", event);
        res.json(event);
      })
      .catch(err => {
        console.log(err);
        res.status(404);
      });
  }
});

// Join event
// Private route
router.post("/category/join/:id", isUserAuth, (req, res) => {
  console.log("JOIN SERVER ROUTE REQ BODY", req.body);
  Event.findById(req.params.id)
    .populate("eventHost")
    .then(event => {
      console.log("EVENT JOINNEEED SEERRRR", event);
      const host = event.eventHost.toString();
      if (req.body.id !== host && req.body.id !== null) {
        if (event.eventAttendees.indexOf(req.body.id) === -1) {
          event.eventAttendees.push(req.body.id);
          User.findById(req.body.id).then(user => {
            console.log("FOUND USER JOIN", user);
            user.eventsAttended.push(event._id);
            user.save().then(user => res.json(user));
          });
          event.save().then(event => res.json(event));
        } else {
          return res.json({ error: "User is already going!" });
        }
      } else {
        return res.json({ error: "Cannot join your own event" });
      }
    })
    .catch(err => res.status(404).json({ event: "No event found" }));
});

module.exports = router;

// Leave event
// Private route
router.delete("/category/join/:id/:user_id", isUserAuth, (req, res) => {
  console.log("ARE WE HITTING LEAVE EVENTS ROUTES", req.params.id);
  Event.findById(req.params.id)
    .populate("eventHost")
    .then(event => {
      if (event.eventAttendees.length === 0) {
        return res.json({ error: "User does not exist" });
      } else {
        if (event.eventAttendees.indexOf(req.params.user_id) !== -1) {
          const filterAttendees = event.eventAttendees.filter(userId => {
            const userStr = userId.toString();
            return userStr !== req.params.user_id;
          });
          console.log("FILTER ARR", filterAttendees);
          event.eventAttendees = filterAttendees;
          event.save().then(event => {
            // Delete event from eventsAttended in User
            User.findById(req.params.user_id).then(user => {
              user.eventsAttended = user.eventsAttended.filter(eventId => {
                const eventStr = eventId.toString();
                return eventStr !== req.params.id;
              });
              user.save().then(user => res.json(user));
            });
            res.json(event);
          });
        } else {
          return res.json({ user: "User never joined event" });
        }
      }
    })
    .catch(err => {
      console.log("ERROR", err);
      res.json({ event: "Event not found" });
    });
});
