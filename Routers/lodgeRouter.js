const router = require('express').Router()
const passport = require('passport')

require("../Middlewares/passport_auth").passport
const file = require('../Middlewares/uploadPicture')

const file = require('../Middlewares/uploadPicture')
const lodgeController = require('../Controllers/lodgeController')
router.post('/addLodge', file.array('photos'), lodgeController.addLodge)
router.get('/lodges',/*passport.authenticate("jwt", { session: false }), */lodgeController.getAllLodges)
router.get('/getById/:id', lodgeController.getLodgeById)
router.put('/updateByid/:id', lodgeController.updateLodge)
router.delete('/delete/:id', lodgeController.deleteLodge),
  router.get('/search/:key', lodgeController.searchLodge)
module.exports = router 
