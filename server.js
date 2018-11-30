const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const userRoutes = require("./routes/user-routes");
const passportSetup = require("./config/passport");
const keys = require("./config/keys");

// Create express app
const app = express();

// connect to mongodb
mongoose.connect(
  keys.mongodb.URI,
  () => {
    console.log("Success! Connected to mongodb");
  }
);

// set up routes
app.use("/auth", userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
