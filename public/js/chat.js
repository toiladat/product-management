// import emoji
// muon dung import thi phai nhung type='module' trong default.pug
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';


var socket = io()

//CLIENT_TYPING
var typingTimeOut;
const inputChat = document.querySelector('.chat .inner-form input[name="content"]')
if (inputChat) {
  inputChat.addEventListener('keyup', e => {
    socket.emit('CLIENT_SENT_TYPING', 'show')
    clearTimeout(typingTimeOut)
    typingTimeOut = setTimeout(() => {
      socket.emit("CLIENT_SENT_TYPING", 'hidden')
    }, 3000)
  })
}
//END_CLIENT_TYPING
//SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
socket.on("SERVER_RETURN_TYPING", (data) => {
  console.log(data.fullName, " dang nhan ");
  if (data.type == "show") {
    const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if (!existTyping) {
      const boxTyping = document.createElement("div");
      boxTyping.classList.add("box-typing");
      boxTyping.setAttribute("user-id", data.userId);
      boxTyping.innerHTML = `
        <div class="inner-name">${data.fullName}</div>
        <div class="inner-dots"><span></span><span></span><span></span></div>
      `;
      elementListTyping.appendChild(boxTyping);
    }
  } else {
    const boxTypingDelete = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if (boxTypingDelete) {
      elementListTyping.removeChild(boxTypingDelete);
    }
  }
})
//End SERVER_RETURN_TYPING

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
      bodyChat.scrollTop = bodyChat.scrollHeight
      // stop typing 
      socket.emit('CLIENT_SENT_TYPING','hidden')

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
  const bodyChat = document.querySelector('.chat .inner-body')
  //insert truoc typing
  bodyChat.insertBefore(div,elementListTyping)

})
//END SERVER_RETURN_MESSAGE

//scroll chat to bottom
const bodyChat = document.querySelector('.chat .inner-body')
if (bodyChat) {
  //xet thanh scroll cach top bang chieu dai cua khung chat
  bodyChat.scrollTop = bodyChat.scrollHeight
}
//end scroll chat to bottom

//show icon chat
const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
  const inputChat = document.querySelector('.chat .inner-form input[name="content"]')

  emojiPicker.addEventListener('emoji-click', event => {
    const icon = event.detail.unicode
    inputChat.value += icon
  })
}

//end show icon chat
// show popup icon
const buttonIcon = document.querySelector('[button-icon]')
if (buttonIcon) {
  const tooltip = document.querySelector('.tooltip')
  // khoi tao pop up ket noi tooltip va btnIcon
  Popper.createPopper(buttonIcon, tooltip)
  // Khi người dùng nhấp vào buttonIcon, hiển thị hoặc ẩn tooltip
  buttonIcon.addEventListener('click', (e) => {
    tooltip.classList.toggle('shown');

  });

  // Khi người dùng nhấp chuột bất kỳ nơi nào khác trong tài liệu
  document.addEventListener('click', (e) => {

    // Nếu nhấp chuột không phải vào buttonIcon hoặc tooltip, ẩn tooltip
    if (!buttonIcon.contains(e.target) && !tooltip.contains(e.target)) {
      tooltip.classList.remove('shown');
    }
  });


}
//end show popup icon