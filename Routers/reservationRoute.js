const reservController = require("../Controllers/reservationController");
const route = require("express").Router();

route.post("/createReservation", reservController.createReservation);
route.get("/getReservationById", reservController.getReservationById);
route.get("/getAllReservation", reservController.getAllReservation);
route.get('/confirmReservation/:confCode',reservController.confirmReservation)
route.get('/getReservationById/:id',reservController.getReservationById)
route.delete('/deleteReservation/:id',reservController.deleteReservation)

module.exports = route;
