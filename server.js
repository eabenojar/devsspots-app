const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const userRoutes = require("./routes/user-routes");
const passportSetup = require("./config/passport");
const keys = require("./config/keys");
cookieSession = require("cookie-session");

// Create express app
const app = express();

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
