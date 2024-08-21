const express=require('express');
const route=express.Router()
const controller=require('../../controllers/client/rooms-chat.controller.js');

route.get('/',controller.index)
module.exports=route