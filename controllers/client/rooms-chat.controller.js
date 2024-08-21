const Rommchat = require("../../model/room-chat.model")
const User = require("../../model/user.model")
//[GET] /rooms-chat/
module.exports.index =async (req, res) => {
  const userId=res.locals.user._id
  const listRoomChat = await Rommchat.find({
    "users.userId":userId,
    typeRoom:'group'
  })
  res.render('client/pages/rooms-chat/index.pug', {
    pageTitle: "Danh sách phòng ",
    listRoomChat:listRoomChat
  })
}

//[GET]/rooms-chat/create
module.exports.create = async (req, res) => {
  const friendsList = res.locals.user.friendsList
  for (friend of friendsList) {
    const inforFriend = await User.findOne({
      _id: friend.userId
    }).select('fullName avatar ')
    friend.fullName = inforFriend.fullName
  }
  res.render('client/pages/rooms-chat/create.pug', {
    pageTitle: "Tạo mới phòng chat",
    friendsList: friendsList
  })
}
//[POST]/rooms-chat/create
module.exports.createPost = async (req, res) => {
  const title = req.body.title
  const userIds = req.body.usersId
  const dataRoomChat = {
    title: title,
    typeRoom: 'group',
    users: []
  }
  //push bản thân
  dataRoomChat.users.push({
    userId: res.locals.user._id,
    role: 'supperAdmin'
  })
  //push friend
  if(!userIds){
    res.redirect('back')
    return
  }
  else if(typeof userIds =='string'){
    dataRoomChat.users.push({
      userId: userIds,
      role: 'user'
    })
  }
  else{
  userIds.forEach(userId => {
    dataRoomChat.users.push({
      userId: userId,
      role: 'user'
    })
  });
  }
  const roomChat= new Rommchat(dataRoomChat)
  await roomChat.save()
  res.redirect(`/chat/${roomChat._id}`)
}