const router = require("express").Router();

const isUserAuth = (req, res, next) => {
  if (!req.user) {
    res.send("User is not logged in");
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/profile", isUserAuth, (req, res) => {
  console.log("REQ PROFILE", req.cookies);
  res.send({ user: req.user });
});

module.exports = router;
