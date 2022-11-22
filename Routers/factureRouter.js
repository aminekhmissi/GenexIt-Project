const router = require('express').Router()
const factureController = require('../Controllers/factureController')
router.post('/addFacture', factureController.addFacture)
router.get('/getFactures', factureController.getAllFactures)
router.get('/getFactureByid/:id', factureController.getAllFactures)
router.put('/updateFacture/:id', factureController.updateFacture)
router.delete('/deleteFacture/:id', factureController.deleteFacture) 
router.get('/count', factureController.countFacture)
module.exports = router 
