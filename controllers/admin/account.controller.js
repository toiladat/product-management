const Role = require("../../model/roles.model")
const Account = require('../../model/account.model');
const md5 = require('md5');
const generateHelper = require('../../helpers/generate.helper');
const {
  prefixAdmin
} = require("../../config/system");
//[GET] /admin/accounts/
module.exports.index = async (req, res) => {
  const records = await Account.find({
    deleted: false
  })
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    })
    record.roleTitle = role.title
  }
  res.render('admin/pages/accounts/index.pug', {
    pageTitle: "Danh sach tai khoan",
    records: records
  })
}
//[GET]/admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false
  }).select('title');
  res.render('admin/pages/accounts/create.pug', {
    roles: roles
  })
}
//[POST]/admin/accounts/create
module.exports.createPost = async (req, res) => {
  if (res.locals.role.permission.includes("accounts_add")) {
    req.body.password = md5(req.body.password)
    req.body.token = generateHelper.generateRandomString(30);
    const newAccount = new Account(req.body)
    await newAccount.save()
    req.flash("success", "Tao moi tai khoan thanh cong")
    res.redirect(`/${prefixAdmin}/accounts`)
  }
}
//[GET]/admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    const record = await Account.findOne({
      _id: id,
      deleted: false
    })

    const roles = await Role.find({
      deleted: false
    }).select('title');
    res.render(`admin/pages/accounts/edit.pug`, {
      pageTitle: "Chinh sua tai khoan",
      roles: roles,
      record: record
    })
  } catch {
    req.flash("error", "Tai khoan khong co"),
      res.redirect('back')
  }
}
//[PATCH]/admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  if (res.locals.role.permission.includes("accounts_edit")) {
    try {
      const id = req.params.id
      if (req.body.password != "")
        req.body.password = md5(req.body.password)
      else
        delete req.body.password

      await Account.updateOne({
        _id: id,
        deleted: false
      }, req.body)
      req.flash("success", "Cap nhat thanh cong")
      res.redirect('back')
    } catch {
      req.flash("error", "Cap nhat that bai"),
        res.redirect('back')
    }
  }
}
