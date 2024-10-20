const {
  prefixAdmin
} = require('../../config/system');
const productCategory = require('../../model/product-category.model');
const createTreeHelper = require('../../helpers/createTree.helper');


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
  if (res.locals.role.permission.includes("products-category_add")) {
    const categories = await productCategory.find({
      deleted: false
    })
    const newCategories = createTreeHelper(categories)
    res.render('admin/pages/product-category/create.pug', {
      pageTitle: "Thêm mới danh mục",
      categories: newCategories
    })
  }
} //[POST]/admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (res.locals.role.permission.includes("products-category_add")) {
    if (req.body.position)
      req.body.position = parseInt(req.body.position)
    else
      req.body.position = await productCategory.countDocuments({}) + 1
    const newProductCategory = new productCategory(req.body)
    await newProductCategory.save()
    res.redirect(`/${prefixAdmin}/products-category/`)
  }
}
//[GET]/admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    const category = await productCategory.findOne({
      _id: id,
      deleted: false
    })
    const categories = await productCategory.find({
      deleted: false
    })
    const newCategories = createTreeHelper(categories);
    res.render('admin/pages/product-category/edit.pug', {
      pageTitle: "Chỉnh sửa danh mục",
      categories: newCategories,
      category: category
    })
  } catch {
    req.flash("error", "Danh muc khong ton tai")
    res.redirect(`/${prefixAdmin}/products-category/`)
  }
}
//[PATCH]/admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  if (res.locals.role.permission.includes("products-category_edit")) {
    try {
      const id = req.params.id
      if (req.body.position)
        req.body.position = parseInt(req.body.position)
      else {
        req.body.position = await productCategory.countDocuments({}) + 1
      }
      await productCategory.updateOne({
        _id: id
      }, req.body)
      req.flash("success", "Cap nhat danh muc thanh cong")
      res.redirect("back")
    } catch {
      req.flash("error", "Danh muc khong ton tai")
      res.redirect(`/${prefixAdmin}/products-category/`)
    }
  }
}
//[GET]/admin/products-category/changeStatus/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const {
      statusChange,
      id
    } = req.params;
    await productCategory.updateOne({
      _id: id,
      deleted: false,
    }, {
      status: statusChange,
      updatedBy: res.locals.account.id
    })
    req.flash('success', 'Cập nhật trạng thái thành công')
    res.redirect('back')
  } catch {
    req.flash('error', "Cập nhật thất bại")
    res.redirect('back')
  }
}
//[PATCH]/admin/products-category/delete
module.exports.delete = async (req, res) => {
  try {
    const id = req.body.id
    await productCategory.updateOne({
      _id:id
    },{
      deleted:true
    })
    res.json({
      code:200,
      message:"Xóa danh mục thành công"
    })
  } catch {
    req.flash('Xóa danh mục thất bại')
    res.redirect('back')
  }
}