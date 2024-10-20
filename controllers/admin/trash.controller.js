const Account = require("../../model/account.model");
const Product = require("../../model/product.model");
const Role = require('../../model/roles.model');
const productCategory = require('../../model/product-category.model');
const paginationHelpers = require("../../helpers/pagination.helper");
//[GET]/admin/trash/products
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
  const pagination = await paginationHelpers(req, find, 'product');
  // end pagination

  // tim kiem theo object find, limit, skip
  const products = await Product.find(find)
    .limit(pagination.limitElement)
    .skip(pagination.skipElement);

  for (item of products) {

    if (item.deletedBy) {
      const deletedBy = await Account.findOne({
        _id: item.deletedBy
      })
      item.deletedByFullName = deletedBy.fullName
    }
  }
  res.render('admin/pages/trash/product.pug', {
    products: products,
    nameInput: nameInput,
    pagination: pagination
  })
};
//[PATCH] '/admin/trash/products/retrieve/:id'
module.exports.retrieveProduct = async (req, res) => {
  try {
    const id = req.params.id

    await Product.updateOne({
      _id: id
    }, {
      deleted: false,
    })
    req.flash("success", "Khoi phuc thanh cong")
    res.json({
      code: 200
    })
  } catch {
    req.flash("error", "San pham khong ton tai")
    res.redirect("back")
  }
}
//[DELETE] /admin/trash/products/delete-permanent/:id
module.exports.deleteProdcutPermanent = async (req, res) => {
  try {
    const id = req.params.id
    await Product.deleteOne({
      _id: id
    })
    req.flash("success", "Xoa san pham thanh cong")
    res.json({
      code: 200
    })
  } catch {
    req.flash("error", "Xoa that bai")
    res.redirect("back")
  }
}

//[GET]/admin/trash/product-category
module.exports.productCategory = async (req, res) => {
  let nameInput = "";
  const find = {
    deleted: true
  }
  // neu co keyword tren url
  if (req.query.keyword) {
    // tao ma regex theo tieu chi tuong duoi
    const regex = new RegExp(req.query.keyword, "i");
    // mongoose se tu hieu la regex.test(title)
    find.title = regex;
    nameInput = req.query.keyword;
  }

  // pagination
  const pagination = await paginationHelpers(req, find, 'category');

  // end pagination
  const categories = await productCategory
    .find(find)
    .limit(pagination.limitElement)
    .skip(pagination.skipElement);
  for (item of categories) {

    if (item.deletedBy) {
      const deletedBy = await Account.findOne({
        _id: item.deletedBy
      })
      item.deletedByFullName = deletedBy.fullName
    }
  }

  res.render('admin/pages/trash/product-category.pug', {
    categories: categories,
    pagination: pagination,
    nameInput: nameInput
  })
};
//[PATCH] /admin/trash/product-category/retrieve/:id
module.exports.retrieveProductCategory = async (req, res) => {
  try {
    const id = req.params.id

    await productCategory.updateOne({
      _id: id
    }, {
      deleted: false,
    })
    req.flash("success", "Khoi phuc thanh cong")
    res.json({
      code: 200
    })
  } catch {
    req.flash("error", "Danh Muc khong ton tai")
    res.redirect("back")
  }
}


//[GET]/admin/trash/accounts
module.exports.accounts = async (req, res) => {
  let nameInput = "";
  const find = {
    deleted: true
  }
  // neu co keyword tren url
  if (req.query.keyword) {
    // tao ma regex theo tieu chi tuong duoi
    const regex = new RegExp(req.query.keyword, "i");
    // mongoose se tu hieu la regex.test(title)
    find.fullName = regex;
    nameInput = req.query.keyword;
  }
  // pagination
  const pagination = await paginationHelpers(req, find, 'account');
  // end pagination
  const accounts = await Account
    .find(find)
    .limit(pagination.limitElement)
    .skip(pagination.skipElement);
  for (const account of accounts) {
    const inforRole = await Role.findOne({
      _id: account.role_id
    }).select('title')
    account.roleTitle = inforRole.title
  }
  res.render('admin/pages/trash/accounts.pug', {
    accounts: accounts,
    pagination:pagination,
    nameInput: nameInput
  })
};
//[PATCH]/admin/trash/accounts/retrieve/:id
module.exports.retrieveAccounts = async (req, res) => {
  try {
    const id = req.params.id

    await Account.updateOne({
      _id: id
    }, {
      deleted: false,
    })
    req.flash("success", "Khoi phuc thanh cong")
    res.json({
      code: 200
    })
  } catch {
    req.flash("error", "Tai khoan khong ton tai")
    res.redirect("back")
  }
}
//[DELETE]/admin/trash/accounts/delete-permanent
module.exports.deleteAccountPermanent = async (req, res) => {
  if (res.locals.role.permission.includes("accounts_delete")) {
    try {
      const id = req.params.id
      await Account.deleteOne({
        _id: id
      })
      req.flash("success", "Xoa tài khoản thanh cong")
      res.json({
        code: 200
      })
    } catch {
      req.flash("error", "Xoa tài khoản that bai")
      res.redirect("back")
    }

  }
}