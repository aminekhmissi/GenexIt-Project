const route =require('express').Router()
const userController=require('../Controllers/userController')

route.get('/getCustomerById/:id',userController.getCustomerById)
route.get('/getOwnerById/:id',userController.getOwnerById)
route.put('/addLodgeToFavoris',userController.addLodgeToFavoris)
route.put('/removeLodgeFromFavoris',userController.removeLodgeFromFavoris)
route.delete('/deleteUser/:id',userController.deleteUser)

module.exports=route