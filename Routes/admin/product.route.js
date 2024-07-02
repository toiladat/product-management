const express= require('express')

const multer= require('multer');
// cac file anh, vid, audio tren web se duoc luu vao thu muc uploads
// trong truong hop nay phai dung ./public
// cac file dung ham upload se duoc luu vao folder uploads
// const upload = multer({dest:'./public/uploads/'})

const storageHelper=require('../../helpers/storageMulter.helper');
const upload = multer ({storage:storageHelper.storage})

const validateProduct=require('../../Validates/admin/product.validate');


const productController= require('../../controllers/admin/product.controller');
const route = express.Router()

route.get('/',productController.index)

route.patch('/changeStatus/:statusChange/:id',productController.changeStatus)
route.patch('/change-multi',productController.changeMulti)
route.patch('/delete',productController.deleteProduct)
route.patch('/change-position/:id',productController.changePosition)
route.get('/create',productController.create)
route.get('/update/:id',productController.updateProductGet);
// chon name cua file o file pug
route.post('/create',
  upload.single("thumbnail"),
  validateProduct.createPost,
  productController.createPost

  )
route.patch('/update/:id',
  upload.single("thumbnail"),
  validateProduct.createPost,
  productController.updateProductPatch)



module.exports=route