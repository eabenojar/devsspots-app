const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
  res.send("Login with Google Fam!");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// callback route for google to redirect to
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    accessType: "offline",
    prompt: "consent",
    session: false
  }),
  (err, req, res) => {
    if (err) {
      console.log("ERROR", err);
    }
    res.send("AYYYEEEE ITS LIT!");
  }
);

module.exports = router;
