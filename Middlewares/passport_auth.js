const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const User = require("../Models/User");

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'kkkk',
};
passport.use(
  new Strategy(options, async ({ id }, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        //throw new Error('user not found')
        return done(null, user);
      }
      if (user.role === "Customer" || user.role === "Owner") {
        return done(null, user);
      } else {
        done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(null, error.message);
    }
  })
);
