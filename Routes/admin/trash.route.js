const express=require('express');
const trashRoute=require('../../controllers/admin/trash.controller');
const route=express.Router()
route.get('/',trashRoute.product)
route.patch('/products/retrieve/:id',trashRoute.retrieveProduct)
route.delete('/products/delete-permanent/:id',trashRoute.deleteProdcutPermanent)
route.get('/user',trashRoute.user)
route.get('/article',trashRoute.article)
module.exports=route