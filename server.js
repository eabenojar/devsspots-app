const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const userRoutes = require("./routes/user");
const passportSetup = require("./config/passport");

// Create express app
const app = express();
// set up routes
app.use("/auth", userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
