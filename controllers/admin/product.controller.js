const Product = require('../../model/product.model');
const config = require('../../config/system');
const productCategory = require('../../model/product-category.model');
const createTreeHelper = require('../../helpers/createTree.helper');
const Account = require('../../model/account.model');
const moment=require("moment")
module.exports.index = async (req, res) => {
  // tao object tim theo tieu chi do
  const find = {
    // mac dinh la chua xoa
    deleted: false
  }

  // tìm kiếm

  // tren thanh tim kiem co noi dung can tim 

  let nameInput = ""
  // neu co keyword tren url
  if (req.query.keyword) {
    // tao ma regex theo tieu chi tuong duoi
    const regex = new RegExp(req.query.keyword, 'i')
    // mongoose se tu hieu la regex.test(title)
    find.title = regex
    nameInput = req.query.keyword
  }
  // het tin kiem

  // neu co status tren url
  if (req.query.status)
    // loc theo status tren url
    find.status = req.query.status

  // pagination
  const paginationHelpers = require('../../helpers/pagination.helper');
  const pagination = await paginationHelpers(req, find)
  // end pagination
  //sort
  const sort = {}

  if (req.query.sortKey && req.query.sortValue)
    sort[req.query.sortKey] = req.query.sortValue
  else
    sort.position = "desc"
  //end sort


  // tim kiem theo object find, limit, skip
  const products = await Product
    .find(find)
    .limit(pagination.productLimit)
    .skip(pagination.productSkip)
    .sort(sort)



  const fillterStatus = [{
      lable: "Tất cả",
      value: ""
    },
    {
      lable: "Hoạt động",
      value: "active"
    },
    {
      lable: "Dừng hoạt động",
      value: "inactive"
    }
  ]
  res.render(`${config.prefixAdmin}/pages/products/product.pug`, {
    products: products,
    nameInput: nameInput,
    fillterStatus: fillterStatus,
    pagination: pagination
  })
}

// [PATH] /admin/products/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
if(res.locals.role.permission.includes("products_edit")){
  try {
    const {
      id,
      statusChange
    } = req.params
    await Product.updateOne({
      _id: id
    }, {
      status: statusChange,
      updatedBy:res.locals.account.id
    })

    // khi khop vao route se dua ra thong bao 
    // key-value cho ben pug
    req.flash('success', 'Cập nhật trạng thái thành công')
    // backend tra ve 1 code success
    // neu controller tra ve cho fe thi no la 1 api
    // neu no khong tra ve thi no la route ( CHUYEN HUONG TOI CAC TRANG trong file pug )
    res.json({
      code: 200
    })
  } catch {
    req.flash("error", "cap nhat that bai")
    res.redirect("back")
  }
}
}

module.exports.changeMulti = async (req, res) => {
if(res.locals.role.permission.includes("products_edit")){
  const data = req.body
  // console.log(data);
  await Product.updateMany({
    _id: data.ids
  }, {
    status: data.status,
    updatedBy:res.locals.account.id
  })

  res.json({
    code: 200
  })
}
}

//[PATCH]'/admin/products/delete'
module.exports.deleteProduct = async (req, res) => {
  if (res.locals.role.permission.includes("products_delete")) {
    const id = req.body.id
    await Product.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedBy:res.locals.account.id
    })
    req.flash("success", "Xóa sản phẩm thành cônng")
    res.json({
      code: 200
    })
  }
}

//[PATCH]/admin/products/change-position/:id
module.exports.changePosition = async (req, res) => {
  if (res.locals.role.permission.includes("products_edit")) {
    try {
      const id = req.params.id
      const position = req.body.position
      
      await Product.updateOne({
        _id: id
      }, {
        position: position,
        updatedBy:res.locals.account.id
      })
      res.json({
        code: 200
      })
    } catch {
      req.flash("error", "San pham khong ton tai")
      res.redirect("back")
    }
  }
}
// [GET]/admin/products/create
module.exports.create = async (req, res) => {
  const categories = await productCategory.find({
    deleted: false
  })
  const newCategories = createTreeHelper(categories)
  res.render(`admin/pages/products/create.pug`, {
    pageTitle: "Thêm mới sản phẩm",
    categories: newCategories
  })
}
//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  if (res.locals.role.permission.includes("products_add")) {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if (req.body.position)
      req.body.position = paseInt(req.body.position)
    else {
      let countProduct = await Product.countDocuments({})
      req.body.position = countProduct + 1
    }
    req.body.createdBy = res.locals.account.id;
    console.log(req.body.notable);
    const newProduct = new Product(req.body)
    newProduct.save()
    res.redirect(`/${config.prefixAdmin}/products/`)
  } else {
    res.send("404")
  }
}
//[GET]/admin/products/update/:id
module.exports.updateProductGet = async (req, res) => {
  if (res.locals.role.permission.includes("products_edit")) {
    try {
      let id = req.params.id;
      const product = await Product.findOne({
        _id: id
      })
      const categories = await productCategory.find({
        deleted: false
      })
      const newCategories = createTreeHelper(categories)
      res.render(`admin/pages/products/update.pug`, {
        pageTitle: "chinh sua san pham",
        item: product,
        categories: newCategories
      })
    } catch {
      req.flash("error", "San Pham Khong ton tai")
      res.redirect("back")
    }
  }

}
//[PATCH]/admin/products/update/:id
module.exports.updateProductPatch = async (req, res) => {
  if (res.locals.role.permission.includes("products_edit")) {
    try {
      const id = req.params.id;
      if (req.file && req.file.filename) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
      }
      req.body.price = parseInt(req.body.price)
      req.body.discountPercentage = parseInt(req.body.discountPercentage)
      req.body.stock = parseInt(req.body.stock)
      if (req.body.position) {
        req.body.position = parseInt(req.bod.position)
      } else {
        req.body.position = await Product.countDocuments({}) + 1;
      }
      console.log(req.body);
      req.body.updatedBy=res.locals.account.id
      await Product.updateOne({
        _id: id
      }, req.body)
      req.flash("success", "Cap nhat san pham thanh cong")

    } catch (ex) {
      req.flash("error", "Cap nhat san pham that bai")
    }
    res.redirect('back')
  }
}
//[GET]/admin/products/detail/:id
module.exports.detail = async (req, res) => {
if(res.locals.role.permission.includes("products_view")){
  try{
    const id = req.params.id
    const productDetail = await Product.findOne({
      _id: id
    })
    if (productDetail.createdBy) {
      const createdBy = await Account.findOne({
        _id:productDetail.createdBy
      })
      productDetail.createdByFullName = createdBy.fullName
      productDetail.createdByEmail=createdBy.email
      //moment lib format time, khong co tham so se la tg hien tai
      // HH -> 24, hh->12
      productDetail.createdAtFormat=moment(productDetail.createdAt).format("DD/MM/YYYY HH:mm:ss")
    }
    if(productDetail.updatedBy){
      const updatedBy=await Account.findOne({
        _id:productDetail.updatedBy
      })
      productDetail.updatedByFullName=updatedBy.fullName
      productDetail.updatedByEmail=updatedBy.email
      productDetail.updatedAtFormat=moment(productDetail.updatedAt).format("DD/MM/YYYY HH:mm:ss")
    }
    res.render('admin/pages/products/detail', {
      product: productDetail
    })
  }
  catch{
    req.flash("error","Không tìm thấy sản phẩm")
    res.redirect("back")
  }
}
}