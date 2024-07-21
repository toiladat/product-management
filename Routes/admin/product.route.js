const express = require('express')

const uploadToCloud=require('../../middewares/admin/uploadToCloud.middewares');
const multer = require('multer');
// cac file anh, vid, audio tren web se duoc luu vao thu muc uploads
// trong truong hop nay phai dung ./public
// cac file dung ham upload se duoc luu vao folder uploads
// const upload = multer({dest:'./public/uploads/'})

const upload = multer()

const validateProduct = require('../../Validates/admin/product.validate');


const productController = require('../../controllers/admin/product.controller');
const route = express.Router()

route.get('/', productController.index)

route.patch('/changeStatus/:statusChange/:id', productController.changeStatus)
route.patch('/change-multi', productController.changeMulti)
route.patch('/delete', productController.deleteProduct)
route.patch('/change-position/:id', productController.changePosition)
route.get('/create', productController.create)
route.get('/update/:id', productController.updateProductGet);
// chon name cua file o file pug
route.post('/create',
  //up anh tu fe len nodejs
  upload.single("thumbnail"),
  // up anh nodejs len cloudinary
  uploadToCloud.uploadSingle,
  validateProduct.createPost,
  productController.createPost
)
// khi ben fe co file trong form thi phai dung multer de dinh dang thi ben be moi nhan duoc 
route.patch('/update/:id',
  upload.single("thumbnail"),
  uploadToCloud.uploadSingle,
  validateProduct.createPost,
  productController.updateProductPatch)
route.get(`/detail/:id`,productController.detail)
module.exports = route