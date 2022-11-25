const router = require('express').Router()
const featureController = require('../Controllers/featureController')

router.post('/add', featureController.addFeature)
router.get('/getall', featureController.getAllFeatures)
router.get('/getbyid/:id', featureController.getFeatureById)  
router.get('/update/:id',featureController.updateFeature)
module.exports = router