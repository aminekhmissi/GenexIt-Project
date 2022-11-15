const reservController = require("../Controllers/reservationController");
const route = require("express").Router();

route.post("/createReservation", reservController.createReservation);
route.get("/getReservationById", reservController.getReservationById);
route.get("/getAllReservation", reservController.getAllReservation);
route.get("/confirmReservation/:confCode", reservController.confirmReservation);
route.get("/getReservationById/:id", reservController.getReservationById);
route.delete("/deleteReservation/:id", reservController.deleteReservation);
route.get("/getAllReservation", reservController.getAllReservation);
route.put("/updateReservation/:id", reservController.updateReservation);

module.exports = route;
