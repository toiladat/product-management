const express=require('express')
const controller=require("../../controllers/client/users.controller")
const router= express.Router()
router.get('/not-friend',controller.notFriend)
router.get('/request',controller.request)
router.get('/accept',controller.accept)
router.get('/friends',controller.friends)
module.exports= router