const {
  prefixAdmin
} = require("../../config/system")
const Account = require("../../model/account.model")
const Role = require("../../model/roles.model")

module.exports =async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`/${prefixAdmin}/auth/login`)
    return
  }
  const account =await Account.findOne({
    token: req.cookies.token,
    deleted:false
  }).select("fullName email phone avatar role_id")
  
  if (!account) {
    req.flash('error','Account not found')
    res.redirect(`/${prefixAdmin}/auth/login`)
    return
  }

  const role= await Role.findOne({
    _id:account.role_id,
    deleted:false
  }).select("title permission")
  
  if(!role){
    req.flash('error','Account havent permission')
    res.redirect(`/${prefixAdmin}/auth/login`)
    return
  }
  // nhu prefixAdmin cac bien trong oj res.locals duoc su dung o toan bo cac file pug
  res.locals.account=account
  res.locals.role=role
  next()
}