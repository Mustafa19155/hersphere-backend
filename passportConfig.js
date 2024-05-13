const LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth2").Strategy;

const User = require("./models/user");
const Admin = require("./models/admin");
const bcrypt = require("bcryptjs");

exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const foundUser = await Admin.findOne({ email: email });

          if (!foundUser) {
            // const encryptedPassword = await bcrypt.hash(password, 10);
            // const user = new Admin({
            //   email: email,
            //   password: encryptedPassword,
            // });

            // await user.save();

            return done(null, false, { message: "User does not exist" });
          } else {
            const validPass = await bcrypt.compare(
              password,
              foundUser.password
            );
            if (!validPass) {
              return done(null, false, { message: "Incorrect password" });
            } else {
              return done(null, foundUser);
            }
          }
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.serializeUser(async (user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};
