const router = require('express').Router()
const equipmentsController = require('../Controllers/equipmentsControllers')
router.post('/add', equipmentsController.addEquipments)
router.get('/get', equipmentsController.getAllEquipments)
router.get('/getbyId/:id', equipmentsController.getEquipmentById)
router.put('/update/:id', equipmentsController.updateEquipment)
router.delete('/delete/:id', equipmentsController.deleteEquipment)
module.exports = router