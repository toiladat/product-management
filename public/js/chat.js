var socket = io()
//CLIENT_SENT_MESSAGE
const formChat = document.querySelector('.chat .inner-form')
if (formChat) {
  formChat.addEventListener('submit', e => {
    e.preventDefault()
    const content = e.target.content.value
    if (content) {
      socket.emit('CLIENT_SENT_MESSAGE', {
        content: content
      })
      e.target.content.value = ""
      //ap dung cho nguoi gui khi sent scroll keo xuong duoi
      bodyChat.scrollTop=bodyChat.scrollHeight

    }
  })
}
//END CLIENT_SENT_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on('SERVER_RETURN_MESSAGE', data => {
  const myId = document.querySelector('[my-id]').getAttribute('my-id')
  const div = document.createElement('div')
  // check nguoi gui hay nhan
  let fullNameHtml = ''
  let avatarHtml = ''
  if (myId == data.userId) {
    div.classList.add('inner-outgoing')
  } else {
    div.classList.add('inner-incoming')
    fullNameHtml = `<div class="inner-name">${data.fullName}</div>`;
    avatarHtml = `<div class="inner-avatar"><img src="${data.avatar}"></div>`
  }
  div.innerHTML = `
    ${fullNameHtml}
    <div class="inner-wrap">
      ${avatarHtml}
      <div class="inner-content">${data.content}</div>
    </div>
  `
  const bodyChat=document.querySelector('.chat .inner-body')
  bodyChat.appendChild(div)

})
//END SERVER_RETURN_MESSAGE

//scroll chat to bottom
const bodyChat=document.querySelector('.chat .inner-body')
if(bodyChat){
  //xet thanh scroll cach top bang chieu dai cua khung chat
  bodyChat.scrollTop=bodyChat.scrollHeight
}
//end scroll chat to bottom