const md5 = require('md5');
const {
  generateRandomNumber
} = require('../../helpers/generate.helper');
const sendMailerHelper=require('../../helpers/sendEmail.helper');

const Account = require('../../model/account.model');
const forgotPassword = require('../../model/forgot-password.model');
//[GET]/admin/password/forgot
module.exports.forgot = (req, res) => {
  res.render('admin/pages/auth/forgot', {
    pageTitle: "Quên mật khẩu"
  })
}
//[POST] /admin/pasword/forgot
module.exports.forgotPost = async (req, res) => {
  const email = req.body.email
  const existAccount = await Account.findOne({
    email: email,
    deleted: false,
    status: 'active'
  })
  if (!existAccount) {
    req.flash('error', 'Email chưa được đăng ký ')
    res.redirect('back')
    return
  }
  // xóa xóa opt trước đó nếu tồn tại
  await forgotPassword.deleteMany({
    email:email
  })
  // việc 1 lưu email, OTP vào csdl forgot-password
  const otp = generateRandomNumber(6)
  const forgotPasswordData = {
    email: email,
    otp: otp,
    expireAt: Date.now() + 3 * 60 * 1000
  }
  const newForgotPassword = new forgotPassword(forgotPasswordData)
  await newForgotPassword.save()


  // việc 2 trả otp qua gmail cho user
  let subject = 'Mã OTP lấy lại mật khẩu'
  let htmls = `<p>Mã OTP là <b style="color:red">${otp}</b>. Có hiệu lực trong 3 phút </p>`
  sendMailerHelper.sendEmail(email,subject,htmls)

  res.redirect(`/admin/password/otp?email=${email}`)
}

//[GET]/admin/password/otp?email=
module.exports.otpPassword=(req,res)=>{
  const email=req.query.email
  res.render('admin/pages/auth/otp-password',{
    email:email,
    pageTitle:"Xác thực OTP"
  })
}
//[POST]/admin/password/otp
module.exports.otpPasswordPost=async(req,res)=>{
  const {email,otp}=req.body
  const result=forgotPassword.findOne({
    email:email,
    otp:otp
  })

  if (!result) {
    req.flash('error', "OTP không hợp lệ")
    res.redirect('back')
    return
  }

  const account=await Account.findOne({
    email:email
  }).select('token')
  res.cookie('token',account.token)
  res.redirect('/admin/password/reset')
}

//[GET]/admin/password/reset
module.exports.resetPassword = (req, res) => {
  res.render('admin/pages/auth/reset-password.pug', {
    pageTitle: "Thay đổi mật khẩu"
  })
}
//[PATCH]/admin/password/reset
module.exports.resetPasswordPatch=async(req,res)=>{
  const token=req.cookies.token;
  const newPass=req.body.password
  await Account.updateOne({
    token:token,
    deleted:false,
  },{
    password:md5(newPass)
  })
  res.redirect(`/admin/dashboard`)
}