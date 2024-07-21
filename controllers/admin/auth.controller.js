const { prefixAdmin } = require("../../config/system");
const Account = require("../../model/account.model")
//md5 hash password 32ktu
const md5 = require('md5');
//[GET]/admin/auth/login
module.exports.login = (req, res) => {
  res.render(`admin/pages/auth/login.pug`, {
    pageTitle: "Đăng nhập"
  })
}
//[GET]
module.exports.loginPost = async (req, res) => {
  //bug làm tính năng ktr email là duy nhất
  const {
    email,
    password
  } = req.body
  const account = await Account.findOne({
    email: email
  })
  if (!account) {
    req.flash("error", "email không tồn tại !")
    res.redirect('back')
    return
  }

  if (md5(password) != account.password) {
    req.flash("error", "Mật khẩu không chính xác")
    res.redirect('back')
    return
  }
  if (account.status == 'inactive') {
    req.flash("error", "Tài khoản đang bị khóa")
    res.redirect('back')
    return
  }
  //set token cho account 
  // khi login sẽ ktra token từ bên fe xem có hợp lệ không
  //logout làm bên fe, khi click xóa token đi và redirect đến form login
  res.cookie('token', account.token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  }).redirect(`/${prefixAdmin}/dashboard`)
}
//[GET]/admin/auth/lougout
module.exports.logout=(req,res)=>{
  res.clearCookie('token')
  res.redirect(`/${prefixAdmin}/auth/login`)
}