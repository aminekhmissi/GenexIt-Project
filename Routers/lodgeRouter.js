const router = require('express').Router()
const lodgeController = require('../Controllers/lodgeController')
router.post('/addLodge', lodgeController.addLodge)
router.get('/lodges', lodgeController.getAllLodges)
router.get('/getById/:id', lodgeController.getLodgeById)
router.put('/updateByid/:id', lodgeController.updateLodge)
router.delete('/delete/:id', lodgeController.deleteLodge)
module.exports = router