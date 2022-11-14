const router = require("express").Router()
const categoryController = require('../Controllers/categoryController')
router.post('/addCategory', categoryController.addCategory)
router.get('/getAllCategories', categoryController.gettAllCategories)
router.get('/categoryById/:id', categoryController.getCategoryByid)
router.delete('/deleteCategory/:id', categoryController.deleteCategory)
router.put('/updateCategory/:id', categoryController.updateCategory)

module.exports = router 
// 