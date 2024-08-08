var socket=io()
//CLIENT_SENT_MESSAGE
const formChat=document.querySelector('.chat .inner-form')
if(formChat){
  formChat.addEventListener('submit',e=>{
    e.preventDefault()
    const content=e.target.content.value
    if(content){
      socket.emit('CLIENT_SENT_MESSAGE',
      {
        content:content
      })
      e.target.content.value=""
    }
  })
}