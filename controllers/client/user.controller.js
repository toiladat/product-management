const User = require('../../model/user.model');
const md5 = require('md5');
const generateHelper = require('../../helpers/generate.helper');
const forgotPassword = require('../../model/forgot-password.model');
const sendMailerHelper=require('../../helpers/sendEmail.helper');
//[GET]/user/register
module.exports.register = (req, res) => {
  res.render('client/pages/user/register.pug', {
    pageTitle: "Đăng ký"
  })
}
//[POST]user/register
module.exports.registerPost = async (req, res) => {
  const {
    fullName,
    email,
    password
  } = req.body
  const existUser = await User.findOne({
    email: email
  })
  if (existUser) {
    req.flash("error", "email đã tồn tại")
    res.redirect('back')
    return
  }
  const newUser = new User({
    fullName: fullName,
    email: email,
    password: md5(password),
    tokenUser: generateHelper.generateRandomString(30)
  })
  await newUser.save()
  res.cookie('userId', newUser.tokenUser)
  req.flash('success', 'Đăng ký thành công')
  res.redirect('/')
}
//[GET] user/login
module.exports.login = (req, res) => {
  res.render('client/pages/user/login', {
    pageTitle: 'Đăng nhập'
  })
}

//[POST]user /loginPost
module.exports.lgoinPost = async (req, res) => {
  try{
    const {
      email,
      password
    } = req.body
    const user = await User.findOne({
      email: email
    })
    if (!user) {
      req.flash('error', 'Email chưa được đăng ký')
      res.redirect('/user/register')
      return
    }
    if (md5(password) != user.password) {
      req.flash('error', 'Mật khẩu nhập sai')
      res.redirect('back')
      return
    }
    if (user.status != 'active') {
      req.flash('error', "Tài khoản chưa được kích hoạt")
      res.redirect('back')
      return
    }
    res.cookie('tokenUser', user.tokenUser)
    req.flash('success', "Đăng nhập thành công")
    res.redirect('/')
  }
  catch{
    req.flash('error',"đăng nhập thất bại")
    res.redirect('back')
  }
}


//[GET] user/logout
module.exports.logout = (req, res) => {
  res.clearCookie('tokenUser')
  res.redirect('/user/login')
}

//[GET] user/password/forgot
module.exports.forgot = (req, res) => {
  res.render('client/pages/user/forgot.pug', {
    pageTitle: "Đổi mật khẩu"
  })
}

//[POST] user/password/forgotPost
module.exports.forgotPost = (req, res) => {
  const email=req.body.email
  const user = User.findOne({
    email: email,
    deleted: false
  })
  if (!user) {
    req.flash("error", "email chưa được đăng ký")
    res.redirect('back')
    return
  }
  // việc 1 lưu email, OTP vào csdl forgot-password
  const forgotPasswordData = {
    email:email,
    otp: generateHelper.generateRandomNumber(6),
    expireAt: Date.now() + 3 * 60 * 1000
  }
  const newForgotPassword = new forgotPassword(forgotPasswordData)
  newForgotPassword.save()

  // việc 2 Gửi otp qua email của user
  const subject="Mã OTP lấy lại mật khẩu"
  const text=`<p>Mã OTP là <b style="color:red">${forgotPasswordData.otp}</b>. Có hiệu lực trong 3 phút </p>`
  sendMailerHelper.sendEmail(email,subject,text)




  res.redirect(`/user/password/otp?email=${req.body.email}`)
}

//[GET]/user/password/otpPassword
module.exports.otpPassword = (req, res) => {
  const email = req.query.email
  res.render('client/pages/user/otp-password', {
    pageTitle: "Xác thực OTP",
    email: email
  })
}

//[POST]/user/password/otpPasswordPost
module.exports.otpPasswordPost = async (req, res) => {
  const {
    email,
    otp
  } = req.body
  // email là tự động lấy rồi
  // nếu k tìm thấy chỉ có thể sai ở otp
  const result = await forgotPassword.findOne({
    email: email,
    otp: otp
  })
  if (!result) {
    req.flash('error', "OTP không hợp lệ")
    res.redirect('back')
    return
  }
  // muốn đổi mk phải có token
  // muốn có token phải có otp success

  const user = await User.findOne({
    email: email
  })
  // đến trang reset phải có token mới được đổi
  res.cookie('tokenUser', user.tokenUser)
  res.redirect('/user/password/reset')
}

//[GET]/user/password/reset
module.exports.resetPassword = (req, res) => {
  res.render('client/pages/user/reset-password.pug', {
    pageTitle: "Thay đổi mật khẩu"
  })

}

//[PATCH]/user/password/reset
module.exports.resetPasswordPatch = async (req, res) => {
  const newPassword = req.body.password
  const tokenUser = req.cookies.tokenUser
  await User.updateOne({
    tokenUser: tokenUser,
    deleted:false
  }, {
    password:md5(newPassword)
  })
  res.redirect('/')
}

//[GET] /user/profile

module.exports.profile=async(req,res)=>{
  res.render('client/pages/user/profile.pug')
}