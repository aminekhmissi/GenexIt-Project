const route =require('express').Router()
const userController=require('../Controllers/userController')

route.get('/getCustomerById/:id',userController.getCustomerById)
route.get('/getOwnerById/:id',userController.getOwnerById)

module.exports=route