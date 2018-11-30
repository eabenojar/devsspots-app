const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");

// used to serialize the user for the session
// user.id is saved to session as req.session.passport.user = {id: '...'}
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
// id is from th req.session.passport.user from the serializeUser
// user object is returned. The done function attaches to the req object as req.user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ googleId: profile.id }, function(err, user) {
      //     return done(err, user);
      //   });
      console.log("passport callback function fired:");
      console.log(profile);
    }
  )
);
