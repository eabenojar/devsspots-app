const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");
const User = require("../models/User");

// used to serialize the user for the session
// user.id is saved to session as req.session.passport.user = {id: '...'}

passport.serializeUser((user, done) => {
  console.log("SERIAL USER", user);
  done(null, user);
});

// // used to deserialize the user
// // id is from th req.session.passport.user from the serializeUser
// // user object is returned. The done function attaches to the req object as req.user

passport.deserializeUser((user, done) => {
  done(null, user);
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
    (accessToken, refreshToken, profile, done) => {
      User.find({ googleId: profile.id })
        .then(currentUser => {
          if (currentUser.length > 0) {
            console.log("Current user is", currentUser);
            done(null, currentUser);
          } else {
            new User({
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              googleId: profile.id,
              email: profile.emails[0].value,
              profileImg: profile.photos[0].value
            })
              .save()
              .then(newUser => {
                console.log("CREATED NEW UERS", newUser);
                done(null, newUser);
              });
          }
        })
        .catch(err => {
          console.log("ERROR", err);
        });
    }
  )
);
