const {
  prefixAdmin
} = require('../../config/system');
const productCategory = require('../../model/product-category.model');
const createTreeHelper=require('../../helpers/createTree.helper');


//[GEt]/admin/products-category
module.exports.index = async (req, res) => {
  const records = await productCategory.find({
    deleted: false
  });
  res.render(`admin/pages/product-category/index.pug`, {
    pageTitle: "Danh muc san pham",
    records: records
  })
}
//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const categories = await productCategory.find({
    deleted: false
  })

  const newCategories = createTreeHelper(categories)
  res.render('admin/pages/product-category/create.pug', {
    pageTitle: "Thêm mới danh mục",
    categories: newCategories
  })
} //[POST]/admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position)
    req.body.position = parseInt(req.body.position)
  else
    req.body.position = await productCategory.countDocuments({}) + 1
  const newProductCategory = new productCategory(req.body)
  await newProductCategory.save()
  res.redirect(`/${prefixAdmin}/products-category/`)
}
//[GET]/admin/products-category/edit/:id
module.exports.edit=async(req,res)=>{
try{
  const id= req.params.id
  const category=await productCategory.findOne({
    _id:id,
    deleted:false
  })
  const categories= await productCategory.find({deleted:false})
  const newCategories=createTreeHelper(categories);
  res.render('admin/pages/product-category/edit.pug',{
    pageTitle:"Chinh sua danh muc",
    categories:categories,
    category:newCategories
  })
}
catch{
  req.flash("error","Danh muc khong ton tai")
  res.redirect(`/${prefixAdmin}/products-category/`)}
}
//[PATCH]/admin/products-category/edit/:id
module.exports.editPatch=async(req,res)=>{
  try{
    const id=req.params.id
  if(req.body.position)
    req.body.position=parseInt(req.body.position)
  else{
    req.body.position=await productCategory.countDocuments({})+1
  }
  await productCategory.updateOne({
    _id:id
  },req.body)
  req.flash("success","Cap nhat danh muc thanh cong")
  res.redirect("back")
  }
  catch{
    req.flash("error","Danh muc khong ton tai")
    res.redirect(`/${prefixAdmin}/products-category/`)
  }
}