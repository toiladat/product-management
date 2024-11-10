const express= require('express')
const route= express.Router()
const controller= require('../../controllers/client/checkout.controller');
route.post('/',controller.index)
route.post('/order',controller.orderPost)
route.get('/success/:orderId',controller.success)

module.exports=route 