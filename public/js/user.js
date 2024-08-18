// gui loi moi kb (request)
const listBtnAddFriend = document.querySelectorAll('[btn-add-friend]')
if (listBtnAddFriend.length > 0) {
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
const listBtnCancelFriend = document.querySelectorAll('[btn-cancel-friend]')
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.box-user').classList.remove('add')
      const userIdB = button.getAttribute('btn-cancel-friend')
      socket.emit('CLIENT_CANCEL_FRIEND', userIdB)
    })
  })
}
// het huy yeu cau kb

// tu choi kb
const listBtnRefuseFriend = document.querySelectorAll('[btn-refuse-friend]')
if (listBtnRefuseFriend.length > 0) {
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
const listBtnAcceptFriend = document.querySelectorAll('[btn-accept-friend]')
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.box-user').classList.add("accepted")

      const userIdB = button.getAttribute('btn-accept-friend')
      socket.emit('CLIENT_ACCEPT_FRIEND', userIdB)
    })
  })
}
// het chap nhan kb


//huy ket ban
const listBtnUnfriend = document.querySelectorAll('[btn-unfriend]')
if (listBtnUnfriend.length > 0) {
  listBtnUnfriend.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.box-user').classList.add('unfriend')

      const userIdB = button.getAttribute('btn-unfriend')
      socket.emit('CLIENT_UNFRIEND', userIdB)
    })
  })
}
// het huy ket ban


//SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on('SERVER_RETURN_LENGTH_ACCEPT_FRIEND', data => {
  const badgeUserAccept = document.querySelector(`[badge-users-accept="${data.userId}"]`)
  if (badgeUserAccept) {
    badgeUserAccept.innerHTML = data.length
  }
})
//END SERVER_RETURN_LENGTH_ACCPET_FRIEND

//SERVER_RETURN_INFOR_ACCEPT_FRIEND
//* file js ben fe phai co _id
socket.on('SERVER_RETURN_INFOR_ACCEPT_FRIEND', data => {
  const dataUserAccept = document.querySelector(`[data-user-accept="${data.userIdB}"]`)
  if (dataUserAccept) {
    const boxUserA = document.createElement('div')
    boxUserA.classList.add("col-6")
    boxUserA.setAttribute('user-id', data.inforA._id)
    boxUserA.innerHTML = `
  <div class="box-user">
    <div class="inner-avatar">
      <img src="https://robohash.org/hicveldicta.png" alt="${data.inforA.fullName}">
    </div>
    <div class="inner-info">
      <div class="inner-name">${data.inforA.fullName}</div>
      <div class="inner-buttons">
        <button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.inforA._id}">Chấp nhận</button>
        <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.inforA._id}">Từ chối</button>
        <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend disa ble">Đã xóa</button>
        <button class="btn btn-sm btn-primary mr-1" btn-accepted-friend disable">Đã chấp nhận</button>
      </div>
    </div>
  </div>
  `
    dataUserAccept.appendChild(boxUserA)
    // set event cho elem moi
    const buttonAccept = boxUserA.querySelector(`[btn-accept-friend="${data.inforA._id}"]`)
    if (buttonAccept) {
      buttonAccept.addEventListener('click', () => {
        buttonAccept.closest('.box-user').classList.add("accepted")

        const userIdB = buttonAccept.getAttribute('btn-accept-friend')
        socket.emit('CLIENT_ACCEPT_FRIEND', userIdB)
      })
    }
    const buttonRefuse = boxUserA.querySelector(`[btn-refuse-friend="${data.inforA._id}"]`)
    if (buttonRefuse) {
      buttonRefuse.addEventListener('click', () => {
        // 1. them class refuse vao boxUser
        // lay element cha dau tien co ten box-user cua button
        buttonRefuse.closest('.box-user').classList.add('refuse')

        //2. gui id cua Nguoi minh tu choi (B) len server, Cua A co san tren sver qua res.locals
        const userIdB = buttonRefuse.getAttribute('btn-refuse-friend');
        socket.emit('CLIENT_REFUSE_FRIEND', userIdB)
      })
    }

  }
})
// END SERVER_RETURN_INFOR_ACCEPT_FRIEND

//SERVER_RETURN_ID_CANCEL_FRIEND
socket.on('SERVER_RETURN_ID_CANCEL_FRIEND',data=>{
  const userAcceptBox=document.querySelector(`[data-user-accept="${data.userRemove}"]`)
  if(userAcceptBox){
    const userCancelBox=userAcceptBox.querySelector(`[user-id="${data.userCancel}"]`)
    if(userCancelBox){
      userAcceptBox.removeChild(userCancelBox)
    }
  }

})
//END SERVER_RETURN_ID_CANCEL_FRIEND

//SERVER_RETURN_USER_ONLNIE
socket.on('SERVER_RETURN_USER_ONLINE',data=>{
  const dataUserFriend=document.querySelector('[data-user-friend]')
  if(dataUserFriend){
    const boxUserA=dataUserFriend.querySelector(`[user-id="${data.userId}"]`)
    if(boxUserA){
      const boxStatus=boxUserA.querySelector('[status]')
      boxStatus.setAttribute('status',data.status)
    }
  }
})
//END SERVER_RETURN_USER_ONLNIE