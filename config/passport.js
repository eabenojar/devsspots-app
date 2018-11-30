const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/User");

// used to serialize the user for the session
// user.id is saved to session as req.session.passport.user = {id: '...'}
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // used to deserialize the user
// // id is from th req.session.passport.user from the serializeUser
// // user object is returned. The done function attaches to the req object as req.user
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

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
      console.log("PROFILE", profile);
      console.log("ACCESS", accessToken);
      console.log("REFRESH", refreshToken);
      //   Check if user alread exists in our db
      //   const test = new User({});
      //   console.log("TEST", test);
      //   new User({
      //     googleId: profile.id,
      //     firstName: profile.name.givenName,
      //     lastName: profile.name.familyName
      //   })
      //     .save()
      //     .then(newUser => {
      //       console.log("CREATED NEW UERS", newUser);
      //       done(null, newUser);
      //     });
      User.find({ googleId: profile.id })
        .then(currentUser => {
          console.log("CURRENT USER", currentUser);
          if (currentUser) {
            console.log("Current user is", currentUser);
            done(null, currentUser);
          } else {
            console.log("ELSE ");
            new User({
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              googleId: profile.id
            })
              .save()
              .then(newUser => {
                console.log("CREATED NEW UERS", newUser);
                done(null, newUser);
              });
          }
        })
        .catch(err => console.log("ERROR", err));
    }
  )
);
