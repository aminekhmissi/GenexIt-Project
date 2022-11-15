const route =require('express').Router()
const commentController=require('../Controllers/commentaireController')

route.post('/createCommentaire',commentController.createCommentaire)
route.put('/updateCommentaire/:id',commentController.updateCommentaire)
route.delete('/deleteCommentaire/:id',commentController.deleteCommentaire)

module.exports=route 