const express=require('express');
const route= express.Router()
const controller= require('../../controllers/client/user.controller');
route.get( `/register`,controller.register)
route.post(`/register`,controller.registerPost)

route.get('/login',controller.login)
route.post('/login',controller.lgoinPost)

route.get('/logout',controller.logout)

route.get('/password/forgot',controller.forgot)
route.post('/password/forgot',controller.forgotPost)

route.get('/password/otp',controller.otpPassword)
route.post('/password/otp',controller.otpPasswordPost)

route.get('/password/reset',controller.resetPassword)
route.patch('/password/reset',controller.resetPasswordPatch)



module.exports=route