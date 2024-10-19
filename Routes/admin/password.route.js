const express=require('express');
const controller=require('../../controllers/admin/password.controller');
const route=express.Router()

route.get('/forgot',controller.forgot)
route.post('/forgot',controller.forgotPost)

route.get('/otp',controller.otpPassword)
route.post('/otp',controller.otpPasswordPost)

route.get('/reset',controller.resetPassword)
route.patch('/reset',controller.resetPasswordPatch)
module.exports=route