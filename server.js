const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
// Passport Config
const passportSetup = require("./config/passport");
const userRoutes = require("./routes/user-routes");
const eventRoutes = require("./routes/event-routes");
const postRoutes = require("./routes/profile-routes");

const keys = require("./config/keys"),
  cookieSession = require("cookie-session"),
  cookieParser = require("cookie-parser");

// Create express app
const app = express();

app.use(cookieParser());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up session cookies

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose
  .connect(
    keys.mongodb.URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Success! Connected to mongodb");
  })
  .catch(err => console.log(err));

// set up routes
app.use("/auth", userRoutes);
app.use("/", postRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
