const Chat=require('../../model/chat.model');
const User=require('../../model/user.model');
module.exports.index=async(req,res)=>{
  const userId=res.locals.user.id
  //socketI0
  // dung _io.on moi khi load lai trang se tao 1 socket moi
  // dung once khi load lai trang se khong tao lai
  _io.once('connection',socket=>{
    // console.log('co nguoi ket noi',socket.id);
    //CLIENT_SENT_MESSAGE
    socket.on('CLIENT_SENT_MESSAGE',async data=>{
      const chatData={
        userId:userId,
        content:data.content
      }
      // luu vao  csdl
      const newChat=new Chat(chatData)
      await newChat.save()


      // tra tin nhan realtime
      //tra ve cho fe
      _io.emit('SERVER_RETURN_MESSAGE',{
        userId:userId,
        fullName:res.locals.user.fullName,
        content:data.content,
        avatar:res.locals.user.avatar
      })
    })
  })
  //end socketIO
  
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