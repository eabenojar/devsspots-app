const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");

// auth login
router.get("/login", (req, res) => {
  // res.send("Login with Google Fam!");
  res.send({ user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// router.post("/register", (req, res) => {
//   console.log("HIT THIS ROUTE", req.body);
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       console.log("INSIDE USER");
//       if (user) {
//         console.log("USER EXISTS");
//       } else {
//         new User({
//           email: req.body.email,
//           firstName: req.body.firstName
//         })
//           .save()
//           .then(user => {
//             console.log("USER SAVED", user);
//             res.send(user);
//           });
//       }
//     })
//     .catch(err => console.log("ERRROOORR", err));
// });
// callback route for google to redirect to
// hand control to passport to use code to grab profile info

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // console.log("USER FROM CALLBACK", req.user);
    res.redirect("/");
  }
);

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
