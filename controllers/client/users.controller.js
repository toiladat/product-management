const User = require("../../model/user.model");
const userSocket = require('../../sockets/clients/user.socket');
// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
  const userId = res.locals.user.id;

  userSocket(req, res)
  // $ne: not equal
  // tim kiem nguoi co id khong phai user dang dang nhap
  //ne: not equal
  //nin:not in

  const acceptFriends = res.locals.user.acceptFriends
  const requestFriends = res.locals.user.requestFriends
  const friendsList=res.locals.user.friendsList
  const friendsListId=friendsList.map(item=>item.userId)
  const users = await User.find({
    //tim nhung ban ghi ma id cua user
    $and: [{ // khong la chinh no
        _id: {
          $ne: userId
        }
      },
      { //chưa gửi lời mời đến bản thân
        _id: {
          $nin: acceptFriends
        }
      },
      { // bản thân chưa gửi lời mời
        _id: {
          $nin: requestFriends
        }
      },
      { // khong nam trong ds ban be
        _id: {
          $nin: friendsListId
        }
      }
    ],
    status: "active",
    deleted: false
  }).select("id avatar fullName");

  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dùng",
    users: users
  });
};

//[GET]/users/request
module.exports.request = async (req, res) => {
  const userId = res.locals.user.id;

  const requestFriends = res.locals.user.requestFriends
  const friendsList=res.locals.user.friendsList
  const friendsListId=friendsList.map(item=>item.userId)
  userSocket(req, res)

  const users = await User.find({
    $and:[
      {
        _id: {
          $in: requestFriends
        }
      },
      {
        _id:{
          $nin:friendsListId
        }
      },
      {
        _id:{
          $ne:userId
        }
      }
    ],
    status: 'active',
    deleted: false
  }).select("id avatar fullName");
  res.render('client/pages/users/request', {
    pageTitle: "Danh sách lời mời đã gửi",
    users: users
  })
}

//[GET]/users/accept
module.exports.accept = async (req, res) => {
  const acceptFriends = res.locals.user.acceptFriends

  userSocket(req, res)

  const users = await User.find({
    _id: {
      $in: acceptFriends
    },
    status: 'active',
    deleted: false
  }).select("id avatar fullName");
  res.render('client/pages/users/accept', {
    pageTitle: "Danh sách lời mời đã nhận",
    users: users
  })
}
//[GET]/users/friends
module.exports.friends=async(req,res)=>{
  const friendsList=res.locals.user.friendsList
  const friendsListId=friendsList.map(item=>item.userId)
  userSocket(req,res)

  const users=await User.find({
    _id:{
      $in:friendsListId
    },
    status:"active",
    deleted:false
  }).select(' id avatar fullName statusOnline')
  res.render('client/pages/users/friends',{
    pageTitle:"Danh sách bạn bè",
    users:users
  })
}