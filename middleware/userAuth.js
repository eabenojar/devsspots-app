const isUserAuth = (req, res, next) => {
  if (!req.user) {
    res.send("User is not logged in!");
    res.redirect("/auth/login");
  } else {
    next();
  }
};

module.exports = isUserAuth;
