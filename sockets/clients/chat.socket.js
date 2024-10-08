const Chat=require('../../model/chat.model');
const User=require('../../model/user.model');

const streamUpload=require('../../helpers/streamUpLoad.helper');

module.exports=(req,res)=>{
  const userId=res.locals.user.id
  const roomChatId=req.params.roomChatId
  //socketI0
  // dung _io.on moi khi load lai trang se tao 1 socket moi
  // dung once khi load lai trang se khong tao lai
  _io.once('connection',socket=>{
    //khi user connect to sever thi se add socket vao room
    //cho socket join vao room
    //https://socket.io/docs/v4/rooms/
    socket.join(roomChatId)
    // console.log('co nguoi ket noi',socket.id);
    //CLIENT_SENT_MESSAGE
    socket.on('CLIENT_SENT_MESSAGE',async data=>{
      const chatData={
        userId:userId,
        content:data.content,
        roomChatId:roomChatId
      }
      const linkImages=[]
      for(image of data.images){
        const result=await streamUpload(image)
        linkImages.push(result.url)
      }
      chatData.images=linkImages
      // // luu vao  csdl
      const newChat=new Chat(chatData)
      await newChat.save()

      // // tra tin nhan realtime
      // //tra ve cho fe
      //tra ve socket trong roomChatId
      _io.to(roomChatId).emit('SERVER_RETURN_MESSAGE',{
        userId:userId,
        fullName:res.locals.user.fullName,
        content:data.content,
        avatar:res.locals.user.avatar,
        images:linkImages
      })
    })
    //CLIENT_SENT_TYPING
    socket.on("CLIENT_SENT_TYPING",type=>{
      socket.broadcast.to(roomChatId).emit('SERVER_RETURN_TYPING',{
        userId:userId,
        fullName:res.locals.user.fullName,
        avatar:res.locals.user.avatar,
        type:type
      })
    }
    )
  })
  //end socketIO
}