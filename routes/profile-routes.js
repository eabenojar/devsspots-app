const router = require("express").Router();
const isUserAuth = require("../middleware/userAuth");

router.get("/profile", isUserAuth, (req, res) => {
  // console.log("REQ PROFILE", req.cookies);
  res.send({ user: req.user });
});

module.exports = router;
