const express=require('express');
const route=express.Router();
const controller=require('../../controllers/admin/roles.controller');




route.get(`/`,controller.index)
route.get(`/create`,controller.create)
route.post(`/create`,controller.createPost)
route.get( `/edit/:id`,controller.edit)
route.patch(`/edit/:id`,controller.editPatch)
route.get(`/permissions`,controller.permissions)
route.patch(`/permissions`,controller.permissionsPatch)

module.exports=route