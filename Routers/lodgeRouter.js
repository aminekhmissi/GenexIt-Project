const router = require('express').Router()

const file = require('../Middlewares/uploadPicture')
const lodgeController = require('../Controllers/lodgeController')
router.post('/addLodge', file.array('photos'), lodgeController.addLodge)
router.get('/lodges', lodgeController.getAllLodges)
router.get('/getById/:id', lodgeController.getLodgeById)
router.put('/updateByid/:id', lodgeController.updateLodge)
router.delete('/delete/:id', lodgeController.deleteLodge),
  router.get('/search', lodgeController.searchLodge)
module.exports = router