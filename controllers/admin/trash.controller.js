const Account = require("../../model/account.model");
const Product = require("../../model/product.model");
module.exports.product = async (req, res) => {
  const find = {
    // mac dinh la chua xoa
    deleted: true,
  };

  let nameInput = "";
  // neu co keyword tren url
  if (req.query.keyword) {
    // tao ma regex theo tieu chi tuong duoi
    const regex = new RegExp(req.query.keyword, "i");
    // mongoose se tu hieu la regex.test(title)
    find.title = regex;
    nameInput = req.query.keyword;
  }
  // neu co status tren url
  if (req.query.status)
    // loc theo status tren url
    find.status = req.query.status;

  // pagination
  const paginationHelpers = require("../../helpers/pagination.helper");
  const pagination = await paginationHelpers(req, find);

  // end pagination

  // tim kiem theo object find, limit, skip
  const products = await Product.find(find)
    .limit(pagination.productLimit)
    .skip(pagination.productSkip);

  for (item of products) {
   
    if (item.deletedBy) {
      const deletedBy = await Account.findOne({
        _id: item.deletedBy
      })
      item.deletedByFullName=deletedBy.fullName
    }
  }
  const fillterStatus = [{
      lable: "Tất cả",
      value: "",
    },
    {
      lable: "Hoạt động",
      value: "active",
    },
    {
      lable: "Dừng hoạt động",
      value: "inactive",
    },
  ];
  res.render('admin/pages/trash/product.pug', {
    products: products,
    nameInput: nameInput,
    fillterStatus: fillterStatus,
    pagination: pagination
  })
};
//[PATCH] '/products/retrieve/:id'
module.exports.retrieveProduct = async (req, res) => {
try{
  const id = req.params.id

  await Product.updateOne({
    _id: id
  }, {
    deleted: false,
    deletedBy:res.locals.account.id
  })
  req.flash("success", "Khoi phuc thanh cong")
  res.json({
    code: 200
  })
}
catch{
  req.flash("error","San pham khong ton tai")
  res.redirect("back")
}
}
//[DELETE] /products/delete-permanent/:id
module.exports.deleteProdcutPermanent = async (req, res) => {
try{
  const id = req.params.id
  await Product.deleteOne({
    _id: id
  })
  req.flash("success", "Xoa san pham thanh cong")
  res.json({
    code: 200
  })
}
catch{
  req.flash("error","Xoa that bai")
  res.redirect("back")
}
}
module.exports.user = (req, res) => {
  res.send("trash user");
};
module.exports.article = (req, res) => {
  res.send("trash article");
};