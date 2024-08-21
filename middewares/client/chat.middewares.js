const Rommchat = require("../../model/room-chat.model")

module.exports.isAccess = async (req, res, next) => {
  try {
    const roomChatId = req.params.roomChatId
    const userId = res.locals.user.id
    const roomChat = await Rommchat.findOne({
      _id: roomChatId,
      users: {
        $elemMatch: {
          userId: userId
        }
      }
      // cach 2 choc vao users tim ban ghi co userId:userId
      // "users.userId":userId
    })
    //neu user khong nam trong roomChat ma van truy cap url thi back
    if (roomChat) {
      next()
    } else
      res.redirect('/')
  } catch {
    res.redirect('/')
  }
}