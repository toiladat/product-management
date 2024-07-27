const User=require('../../model/user.model');
const md5=require('md5');
const generateHelper=require('../../helpers/generate.helper');
const forgotPassword = require('../../model/forgot-password.model');
//[GET]/user/register
module.exports.register=(req,res)=>{
  res.render('client/pages/user/register.pug',{
    pageTitle:"Đăng ký"
  })
}
//[POST]user/register
module.exports.registerPost=async(req,res)=>{
  const {fullName,email,password}=req.body
  const existUser= await User.findOne({email:email})
  if(existUser){
    req.flash("error","email đã tồn tại")
    res.redirect('back')
    return
  }
  const newUser= new User({
    fullName:fullName,
    email:email,
    password:md5(password),
    tokenUser:generateHelper.generateRandomString(30)
  })
  await newUser.save()
  res.cookie('userId',newUser.tokenUser)
  req.flash('success','Đăng ký thành công')
  res.redirect('/')
}
//[GET] user/login
module.exports.login=(req,res)=>{
  res.render('client/pages/user/login',{
    pageTitle:'Đăng nhập'
  })
}

//[POST]user /loginPost
module.exports.lgoinPost=async (req,res)=>{
  const {email,password}=req.body
  const user= await User.findOne({email:email})
  if(!user){
    req.flash('error','Email chưa được đăng ký')
    res.redirect('/user/register')
    return
  }
  if(md5(password)!=user.password){
    req.flash('error','Mật khẩu nhập sai')
    res.redirect('back')
    return
  }
  if(user.status!='active'){
    req.flash('error',"Tài khoản chưa được kích hoạt")
    res.redirect('back')
    return
  }
  res.cookie('tokenUser',user.tokenUser)
  req.flash('success',"Đăng nhập thành công")
  res.redirect('/')
}


//[GET] user/logout
module.exports.logout=(req,res)=>{
  res.clearCookie('tokenUser')
  res.redirect('/user/login')
}

//[GET] user/password/forgot
module.exports.forgot=(req,res)=>{
  res.render('client/pages/user/forgot.pug',{
    pageTitle:"Đổi mật khẩu"
  })
}

//[POST] user/password/forgotPost
module.exports.forgotPost=(req,res)=>{

  const user= User.findOne({
    email:req.body.email,
    deleted:false
  })  
  if(!user){
    req.flash("error","email chưa được đăng ký")
    res.redirect('back')
    return
  }
  // việc 1 lưu email, OTP vào csdl forgot-password
  const forgotPasswordData= {
    email:req.body.email,
    otp: generateHelper.generateRandomNumber(6),
    expireAt: Date.now()+ 3*60*1000
  }
  const newForgotPassword=new forgotPassword(forgotPasswordData)
  newForgotPassword.save()
  console.log(forgotPasswordData);

  // việc 2 Gửi otp qua email của user


  res.redirect(`/user/password/otp?email=${req.body.email}`)
}
