const productCategory= require('../../model/product-category.model');
const createTreeHelper=require('../../helpers/createTree.helper');
module.exports= async(req,res,next)=>{
const category= await productCategory.find({
  deleted:false,
  status:'active'
})
const categoryFormat=createTreeHelper(category)
res.locals.categories=categoryFormat
next()
}