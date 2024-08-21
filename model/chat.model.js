const mongoose=require('mongoose');
const chatShema=new mongoose.Schema({
  userId:String,
  roomChatId:String,
  content:String,
  images:Array,
  // statusView:{
  //   default:'',
  //   type:String
  // }
},{
  timestamps:true
})
const Chat=mongoose.model('Chat',chatShema,"chats")
module.exports=Chat