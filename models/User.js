const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: false
    },
    email: {
      type: String
    },
    avatar: {
      type: String
    },
    admin: {
      type: Boolean,
      default: false
    },
    googleId: {
      type: String,
      required: false
    },
    profileImg: {
      type: String
    },
    eventsHosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    eventsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);
