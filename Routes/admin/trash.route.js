const express=require('express');
const trashRoute=require('../../controllers/admin/trash.controller');
const route=express.Router()

route.get('/products',trashRoute.product)
route.patch('/products/retrieve/:id',trashRoute.retrieveProduct)
route.delete('/products/delete-permanent/:id',trashRoute.deleteProdcutPermanent)

route.get('/accounts',trashRoute.accounts)
route.patch('/accounts/retrieve/:id',trashRoute.retrieveAccounts)
route.delete('/accounts/delete-permanent/:id',trashRoute.deleteAccountPermanent)

route.get('/product-category',trashRoute.productCategory)
route.patch('/product-category/retrieve/:id',trashRoute.retrieveProductCategory)

module.exports=route