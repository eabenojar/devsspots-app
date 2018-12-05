const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    eventTitle: {
      type: String,
      required: true
    },
    eventDescription: {
      type: String,
      required: true
    },

    // eventCapacity: {
    //   type: Number,
    //   required: true
    // },
    eventHost: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // eventImage: {
    //   type: String
    // },
    eventLocation: {
      lat: Number,
      lng: Number
    },
    eventAddress: {
      type: String,
      required: true
    },
    eventCategory: {
      type: String,
      required: true
    },
    eventMapUrl: {
      type: String,
      required: true
    },
    // timeStart: {
    //   type: String,
    //   required: true
    // },
    // timeEnd: {
    //   type: String,
    //   required: true
    // },
    eventAttendees: {
      type: [String]
    }
    // eventDate: {
    //   type: Date,
    //   required: true
    // }
  },
  { timestamps: true }
);

module.exports = EventModel = mongoose.model("event", EventSchema);
