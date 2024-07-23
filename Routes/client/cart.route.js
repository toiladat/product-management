const express= require('express');
const route=express.Router()
const controller=require('../../controllers/client/cart.controller');

route.get('/',controller.index)
route.post('/add/:productId',controller.addPost)
route.get('/delete/:productId',controller.delete)
route.get('/update/:productId/:quantity',controller.update)
module.exports=route