const router = require("express").Router()

const adressController = require('../Controllers/adressController')
router.post('/Addadress', adressController.addAdress)


module.exports = router