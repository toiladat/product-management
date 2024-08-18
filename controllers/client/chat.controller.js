const Chat=require('../../model/chat.model');
const User=require('../../model/user.model');

const chatSocket=require('../../sockets/clients/chat.socket');
module.exports.index=async(req,res)=>{
 
  chatSocket(req,res);
  // lay ra tat ca chats 
  const chats=await Chat.find({})
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