const Chat=require('../../model/chat.model');
const User=require('../../model/user.model');

const chatSocket=require('../../sockets/clients/chat.socket');

//[GET]/chat/:roomChatId
module.exports.index=async(req,res)=>{
  const roomChatId=req.params.roomChatId
  chatSocket(req,res);
  // lay ra tat ca chats thuoc roomChatId
  const chats=await Chat.find({
    roomChatId:roomChatId
  })
  
  // lay ra userInfor cua tung tin nhan
  // ke ca nguoi gui hay nguoi nhan
  for(let chat of chats){
    const userInfor= await User.findOne(
    {
      _id:chat.userId
    })
    chat.fullName=userInfor.fullName;
    chat.avatar=userInfor.avatar
  }
  res.render('client/pages/chat/index.pug',{
    pageTitle:"Chat",
    chats:chats
  })
}