const route = require("express").Router();
const userController = require("../Controllers/userController");

const passport = require("passport");
require("../Middlewares/passport_auth").passport;

route.get("/getCustomerById/:id", userController.getCustomerById);
route.get("/getOwnerById/:id", userController.getOwnerById);
route.put(
  "/addLodgeToFavoris",
  passport.authenticate("jwt", { session: false }),
  userController.addLodgeToFavoris
);
route.put(
  "/removeLodgeFromFavoris",
  passport.authenticate("jwt", { session: false }),
  userController.removeLodgeFromFavoris
);
route.delete(
  "/deleteUser/:id",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

module.exports = route;
