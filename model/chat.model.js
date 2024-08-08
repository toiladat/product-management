const mongoose=require('mongoose');
const chatShema=new mongoose.Schema({
  userId:String,
  // roomChatId:String,
  content:String,
  image:Array
},{
  timestamps:true
})
const Chat=mongoose.model('Chat',chatShema,"chats")
module.exports=Chat