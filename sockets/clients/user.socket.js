const User = require('../../model/user.model');
module.exports = (req, res) => {
  //id nguoi gui
  const userIdA = res.locals.user.id

  // dung _io.on moi khi load lai trang se tao 1 socket moi
  // dung once khi load lai trang se khong tao lai
  _io.once('connection', socket => {
    //CLIENT_ADD_FRIEND

    socket.on('CLIENT_ADD_FRIEND', async userIdB => {
      try {
        //1.Them idA vao acceptFriendsB
        const existAinB = await User.findOne({
          _id: userIdB,
          // ktra trong acceptFriends cua B co A hay chua
          acceptFriends: userIdA
        })
        if (!existAinB) {
          await User.updateOne({
            _id: userIdB
          }, {
            $push: {
              acceptFriends: userIdA
            }
          })
        }
        //2.Them idB vao requestFriendsA
        const existBinA = await User.findOne({
          _id: userIdA,
          //ktra trong requestFriends cua A co B hay chua
          requestFriends: userIdB
        })
        if (!existBinA) {
          await User.updateOne({
            _id: userIdA
          }, {
            $push: {
              requestFriends: userIdB
            }
          })
        }
      } catch {
        req.flash('error', 'Ket ban that bai')
      }
    })
    //END CLIENT_ADD_FRIEND

    //CLIENT_CANCEL_FRIEND
    socket.on('CLIENT_CANCEL_FRIEND', async userIdB => {
      try {
        //ktra A co nam trong acp cua B hay khong
        const existAinB = await User.findOne({
          _id: userIdB,
          acceptFriends: userIdA
        })
        if (existAinB) {
          await User.updateOne({
            _id: userIdB
          }, {
            $pull: {
              acceptFriends: userIdA
            }
          })
        }
        //ktra B co nam trong rq cua A hay khong
        const existBinA = await User.findOne({
          _id: userIdA,
          requestFriends: userIdB
        })
        if (existBinA) {
          await User.updateOne({
            _id: userIdA
          }, {
            $pull: {
              requestFriends: userIdB
            }
          })
        }

      } catch {
        req.flash('error', "That bai")
      }
    })
    //END CLIENT_CANCEL_FRIEND

    //CLIENT_REFUSE_FRIEND
    socket.on('CLIENT_REFUSE_FRIEND', async userIdB => {
      try {
        //xoa B trong acp cua A
        const existBinA = await User.findOne({
          _id: userIdA,
          acceptFriends: userIdB
        })
        if (existBinA) {
          await User.updateOne({
            _id: userIdA
          }, {
            $pull: {
              acceptFriends: userIdB
            }
          })
        }
        //Xoa A trong rq cua B
        const existAinB = await User.findOne({
          _id: userIdB,
          requestFriends: userIdA
        })
        if (existAinB) {
          await User.updateOne({
            _id: userIdB
          }, {
            $pull: {
              requestFriends: userIdA
            }
          })
        }
      } catch {
        req.flash('error', 'that bai')
      }
    })
    //END CLIENT_REFUSE_FRIEND

    //CLIENT_ACCEPT_FRIEND

    socket.on('CLIENT_ACCEPT_FRIEND', async userIdB => {
      try { //ktra A co trong rq B hay k
        const existAinB = await User.findOne({
          _id: userIdB,
          requestFriends: userIdA
        })
        if (existAinB) {
          await User.updateOne({
            _id: userIdB
          }, {
            // them {userId va roomChatId} cua A vao friendList cua B
            $push: {
              friendsList: {
                roomChatId: "",
                userId: userIdA
              }
            },
            $pull: {
              requestFriends: userIdA
            }
          })
        }

        const existBinA = await User.findOne({
          _id: userIdA,
          acceptFriends: userIdB
        })
        if (existBinA) {
          await User.updateOne({
            _id: userIdA
          }, {
            // them {userId va roomChatId} cua B vao friendList cua A
            $push: {
              friendsList: {
                roomChatId: "",
                userId: userIdB
              }
            },
            $pull: {
              acceptFriends: userIdB
            }
          })
        }
      } catch {
        req.flash('error', 'Chap nhan that bai')
      }
    })
    // END CLIENT_ACCEPT_FRIEND


    //CLIENT_UNFRIEND
    socket.on('CLIENT_UNFRIEND', async userIdB => {
      try {
        const existAinB = await User.findOne({
          _id: userIdB,
          friendsList: {
            // tìm bản ghi có object có 1 key value trùng
            $elemMatch: { userId: userIdA }
          }
        });
        
        if (existAinB) {
          console.log('ok');
          await User.updateOne({
            _id: userIdB
          }, {
            $pull: {
              friendsList: {
                userId: userIdA
              }
            }
          });
        }
        const existBinA = await User.findOne({
          _id: userIdA,
          friendsList: {
            $elemMatch: { userId: userIdB }
          }
        })
        if (existBinA) {
          
          await User.updateOne({
            _id: userIdA
          }, {
            $pull: {
              friendsList: {
                userId: userIdB
              }
            }
          })
        }
      } catch {
        req.flash('error', 'Huy ket ban that bai')
      }
    })
    //END CLIENT_UNFRIEND
























  })
}