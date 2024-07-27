const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 11
  }
  // search expires mongoose 
  // xét thời gian hết hạn của 1 bản ghi có thể áp dụng cho cart
  // expires: số giây từ hiện tại
  // có thể xét thg ở bên controller( mili giây)
}, {
  timestamps: true
})

const forgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, 'forgot-password')
module.exports = forgotPassword