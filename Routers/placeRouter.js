const router = require('express').Router()
const placeController = require("../Controllers/placeController")
router.post('/addPlaces', placeController.addPlace)
router.delete('/deletePlace/:id', placeController.deletePlace)
router.get('/getAllPlaces', placeController.getAllPlaces)
router.get('/getByid/:id', placeController.getPlceById)
router.put('/updatePlace/:id', placeController.updatePlace)
module.exports = router