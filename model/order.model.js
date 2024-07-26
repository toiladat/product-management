const mongoose= require('mongoose');

const orderShema = new mongoose.Schema({
  userInfor:{
    fullName:String,
    phone:String,
    address:String
  },
  products:[
    {
      productId:String,
      price:Number,
      discountPercentage:Number,
      quantity:Number
    }
  ]
},{
  timestamps:true
})

const Order= mongoose.model('Order',orderShema,'orders')
module.exports=Order