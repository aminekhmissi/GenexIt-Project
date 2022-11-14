const route = require("express").Router();
const authController = require("../Controllers/authenticationController");
const uploadPicture = require("../Middlewares/uploadPicture");

const passport = require("passport");
require("../Middlewares/passport_auth").passport;

route.post("/registerAdmin", authController.registerAdmin);
route.post(
  "/registerCustomer",
  uploadPicture.single("photo"),
  authController.registerCustomer
);
route.post(
  "/registerOwner",
  uploadPicture.single("photo"),
  authController.registerOwner
);
route.get("/verifyAccount/:verifyCode", authController.verifyEmail);
route.post("/login", authController.login);
route.post("/logout", authController.logout);
route.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  authController.profile
);
route.put(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  authController.updateProfile
);
route.post("/forgetPassword", authController.forgetPassword);
route.post("/resetPassword/:token", authController.resetPassword);

module.exports = route;
