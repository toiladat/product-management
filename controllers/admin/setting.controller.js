const Setting = require('../../model/setting.model');
module.exports.general = async (req, res) => {
  const settings = await Setting.findOne({})
  console.log(settings);
  res.render('admin/pages/settings/general.pug', {
    pageTitle: 'Cài đặt chung',
    setting: settings
  })
}
//[PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
  const settings = await Setting.findOne({})
  if (!settings) {
    const newSettings = new Setting(req.body)
    await newSettings.save()
  } else
    await Setting.updateOne({
        _id: settings.id
      },
      req.body)

  req.flash('success', "cập nhật thành công")
  res.redirect('back')
}