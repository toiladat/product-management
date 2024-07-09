const express=require('express');
const multer=require('multer');
const route=express.Router()
const upload=multer()
const uploadToCloud=require('../../middewares/admin/uploadToCloud.middewares');
const validateProCate= require('../../Validates/admin/product.validate');
const controller=require('../../controllers/admin/productCategory.controller');


route.get( `/`,controller.index)
route.get( `/create`,controller.create)
route.post(`/create`,
  upload.single('thumbnail'),
  uploadToCloud.uploadSingle,
  validateProCate.createPost,
  controller.createPost
  )

route.get('/edit/:id',controller.edit)

route.patch(`/edit/:id`,
  upload.single('thumbnail'),
  uploadToCloud.uploadSingle,
  validateProCate.createPost,
  controller.editPatch
  )


module.exports = route
