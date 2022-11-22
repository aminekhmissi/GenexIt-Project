const router = require("express").Router()

const adressController = require('../Controllers/adressController')
router.post('/Addadress', adressController.addAdress)
router.get('/getByid/:id', adressController.getadressByid)


module.exports = router 