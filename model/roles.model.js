const mongoose =require('mongoose');
const slug= require('mongoose-slug-updater');
mongoose.plugin(slug)

const {Schema}=mongoose

const roleSchema = new Schema({
  title:String,
  description:String,
  permission:{
    type:Array,
    default:[]
  },
  deleted:{
    type:Boolean,
    default:false
  }
},
  {
  timestamps:true
})

const Role=mongoose.model('Role',roleSchema,'roles')
module.exports=Role
