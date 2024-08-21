const mongoose = require('mongoose');
const roomChatSchema = new mongoose.Schema(
  {
    title:String,
    avatar:String,
    typeRoom:String,
    // color:String,
    users:[
      {
        userId:String,
        role:String,
        //check !="" thi lay nickName ra set cho nameUser
        // nickName:String
      }
    ],
    deleted:{
      type:String,
      default:false
    }
  },{
    timestamps:true
  }
)
const Rommchat=mongoose.model('RoomChat',roomChatSchema,'rooms-chat')
module.exports=Rommchat