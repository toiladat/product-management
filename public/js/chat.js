// import emoji
// muon dung import thi phai nhung type='module' trong default.pug
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';


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
  // khởi tạo để up load nhiều ảnh
  const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
    multiple: true,
    maxFileCount: 6
  });
  formChat.addEventListener('submit', e => {
    e.preventDefault()
    const content = e.target.content.value || "";
    const images = upload.cachedFileArray;
    // console.log(images);
    if (content || images.length > 0) {
      socket.emit('CLIENT_SENT_MESSAGE', {
        content: content,
        images:images
      })
      e.target.content.value = ""
      //ap dung cho nguoi gui khi sent scroll keo xuong duoi
      bodyChat.scrollTop = bodyChat.scrollHeight
      // stop typing 
      socket.emit('CLIENT_SENT_TYPING','hidden')
      //clear images
      upload.resetPreviewPanel()
    }
  })
}
//END CLIENT_SENT_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on('SERVER_RETURN_MESSAGE', data => {
  const myId = document.querySelector('[my-id]').getAttribute('my-id')
  const div = document.createElement('div')
  console.log(data);
  // check nguoi gui hay nhan
  let fullNameHtml = ``
  let avatarHtml = ``
  let textHtml=``
  let htmlImages=``
  //ktra nguoi gui hay nhan
  if (myId == data.userId) {
    div.classList.add('inner-outgoing')
  } else {
    div.classList.add('inner-incoming')
    fullNameHtml = `<div class="inner-name">${data.fullName}</div>`;
    avatarHtml = `<div class="inner-avatar"><img src="${data.avatar}"></div>`
  }
  //ktra content
  if(data.content){
    textHtml=`<div class="inner-text">${data.content}</div>`
  }
  //ktra images
  if(data.images.length > 0) {
    htmlImages += `
      <div class="inner-images">
    `;

    for (const image of data.images) {
      htmlImages += `
        <img src="${image}">
      `;
    }

    htmlImages += `
      </div>
    `;}


  div.innerHTML = `
    ${fullNameHtml}
    <div class="inner-wrap">
      ${avatarHtml}
      <div class="inner-content"> 
        ${textHtml}
        ${htmlImages}
      </div>
    </div>
  `
  const bodyChat = document.querySelector('.chat .inner-body')
  //insert truoc typing
  bodyChat.insertBefore(div,elementListTyping)
  // cap nhat zoom cho anh moi nhat
  new Viewer(div);
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

// Preview Image
if(bodyChat) {
  new Viewer(bodyChat);
}
// End Preview Image