const mongoose=require('mongoose');
const slug=require('mongoose-slug-updater');
mongoose.plugin(slug)
const {Schema}=mongoose

const newAccountSchema=new Schema({
  fullName:String,
  email:String,
  phone:String,
  password:String,
  token:String,
  avatar:String,
  role_id:String,
  status:String,
  deleted:{
    type:Boolean,
    default:false
  }
},{
  timestamps:true
})

const Account = mongoose.model('Account',newAccountSchema,'accounts')
module.exports=Account