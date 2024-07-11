const {
  prefixAdmin
} = require('../../config/system');
const Role = require('../../model/roles.model');

//[GET]/admin/roles/
module.exports.index = async (req, res) => {
  const records = await Role.find({
    deleted: false
  })
  res.render(`admin/pages/roles/index.pug`, {
    pageTitle: "Nhóm Quyền",
    records: records
  })
}
//[GET]/admin/roles/create
module.exports.create = (req, res) => {
  res.render(`admin/pages/roles/create.pug`, {
    pageTitle: "Thêm nhóm quyền"
  })
}
//[POST]/admin/roles/create
module.exports.createPost = async (req, res) => {

  const role = req.body
  const newRole = new Role(role)
  await newRole.save()

  res.redirect(`/${prefixAdmin}/roles/`)

}
//[GET]/admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    const record = await Role.findOne({
      deleted: false,
      _id: id
    })
    res.render(`admin/pages/roles/edit`, {
      pageTitle: "Chinh sua nhom quyen",
      record: record
    })
  } catch {
    req.flash("error", "Nhóm quyền không tồn tại"),
      res.redirect("back")
  }
}
//[PATCH]/admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id
    await Role.updateOne({
        _id: id,
        deleted: false
      },
      req.body
    )
    req.flash("success", "Chinh sua thanh cong")
    res.redirect('back')
  } catch {
    req.flash("error", "Chinh sua that bai")
    res.redirect("back")
  }
}
//[GET]/admin/roles/permissions
module.exports.permissions = async (req, res) => {
  const record = await Role.find({
    deleted: false
  })
  res.render(`admin/pages/roles/permissions.pug`, {
    records: record
  })
}
//[PATCh]/admin/roles/permission
module.exports.permissionsPatch = async (req, res) => {
  const roles = req.body
  for (const role of roles) {
    await Role.updateOne({
      _id: role.id,
      deleted: false
    }, {
      permission: role.permission
    })
  }
  res.json({
    code: 200,
    message: "Cap nhat thanh cong"
  })
}