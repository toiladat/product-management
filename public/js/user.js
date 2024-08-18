// gui loi moi kb (request)
const listBtnAddFriend = document.querySelectorAll('[btn-add-friend]')
if (listBtnAddFriend.length>0) {
  listBtnAddFriend.forEach(button => {
    button.addEventListener('click', () => {
      // 1. them class add vao boxUser
      // lay element cha dau tien co ten box-user cua button
      button.closest('.box-user').classList.add('add')

      //2. gui id cua Nguoi Nhan (B) len server, Cua A co san tren sver qua res.locals
      const userIdB = button.getAttribute('btn-add-friend');
      socket.emit('CLIENT_ADD_FRIEND', userIdB)
    })
  })
}
//het gui loi moi kb( request)

// huy yeu cau kb
const listBtnCancelFriend=document.querySelectorAll('[btn-cancel-friend]')
if(listBtnCancelFriend.length>0){
  listBtnCancelFriend.forEach(button=>{
    button.addEventListener('click',()=>{
      button.closest('.box-user').classList.remove('add')
      const userIdB=button.getAttribute('btn-cancel-friend')
      socket.emit('CLIENT_CANCEL_FRIEND',userIdB)
    })
  })
}
// het huy yeu cau kb

// tu choi kb
const listBtnRefuseFriend = document.querySelectorAll('[btn-refuse-friend]')
if (listBtnRefuseFriend.length>0) {
  listBtnRefuseFriend.forEach(button => {
    button.addEventListener('click', () => {
      // 1. them class refuse vao boxUser
      // lay element cha dau tien co ten box-user cua button
      button.closest('.box-user').classList.add('refuse')
      
      //2. gui id cua Nguoi minh tu choi (B) len server, Cua A co san tren sver qua res.locals
      const userIdB = button.getAttribute('btn-refuse-friend');
      socket.emit('CLIENT_REFUSE_FRIEND', userIdB)
    })
  })
}
//het tu choi kb


// chap nhan kb
const listBtnAcceptFriend=document.querySelectorAll('[btn-accept-friend]')
if(listBtnAcceptFriend.length>0){
  listBtnAcceptFriend.forEach(button=>{  
    button.addEventListener('click',()=>{
      button.closest('.box-user').classList.add("accepted")

      const userIdB=button.getAttribute('btn-accept-friend')
      socket.emit('CLIENT_ACCEPT_FRIEND',userIdB)
    })
  })
}
// het chap nhan kb


//huy ket ban
const listBtnUnfriend=document.querySelectorAll('[btn-unfriend]')
if(listBtnUnfriend.length>0){
  listBtnUnfriend.forEach(button=>{
    button.addEventListener('click',()=>{
      button.closest('.box-user').classList.add('unfriend')

      const userIdB=button.getAttribute('btn-unfriend')
      console.log(userIdB);
      socket.emit('CLIENT_UNFRIEND',userIdB)
    })
  })
}
// het huy ket ban