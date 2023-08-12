const passport = require("passport");
const { app } = require('../app');

const User = require('../database/models/user.model');
const { findUserPerEmail, findUserPerGoogleId } = require('../queries/users.queries');

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

require('dotenv').config()

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});


passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// On précise que le usernameField de LocalStrategy, doit get la clé "email" plutôt que username
passport.use('local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await findUserPerEmail(email)
        if (user) {
            const match = await user.comparePassword(password)
            if (match) {
                done(null, user);
            } else {
                done(null, false, { message: "password doesn\'t match" })
            }
        } else {
            done(null, false, { message: "user not found" });
        }
    } catch (error) {
        done(error);
    };
}));


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    callbackURL: "/auth/google/cb",
  }, async (request, accessToken, refreshToken, profile, done) => {
    try {
        const user = await findUserPerGoogleId(profile.id);
        if (user) {
            done(null, user);
        } else {
            const newUser = new User({
                username: profile.displayName,
                local: {
                    email: profile.emails[0].value,
                    googleId: profile.id,
                }
            })
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (error) {
        done(error)
    }
  } 
));

