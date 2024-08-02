const mongoose=require('mongoose');
const slug=require('mongoose-slug-updater');
mongoose.plugin(slug)
const {Schema}=mongoose

const settingSchema=new Schema({
  websiteName:String,
  phone:String,
  address:String,
  logo:String,
  email:String,
  copyright:String
},{
  timestamps:true
})

const Setting = mongoose.model('Setting',settingSchema,'settings')
module.exports=Setting