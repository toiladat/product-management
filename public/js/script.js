// tu sau lan khai bao dau tien cac dong,file js sau do co the sdung socket
// declare ngoai file modudle vi declare trong file type module chi dung duoc trong file do thoi
var socket = io()

// pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]")

if (listButtonPagination.length > 0) {
  let url = new URL(window.location.href)

  listButtonPagination.forEach(item => {
    item.addEventListener('click', () => {
      const buttonNumber = item.getAttribute('button-pagination')
      url.searchParams.set("page", buttonNumber)
      window.location.href = url.href
    })
  })
}
// end pagination

// cập nhật số lượng sản phẩm trong giỏ hàng
const quantityList= document.querySelectorAll("[cart] input[name='quantity']")
if(quantityList.length>0){
  quantityList.forEach(item=>{
    item.addEventListener('change',()=>{
      const productId=item.getAttribute('item-id')
      const quantity=item.value
      if(productId && quantity>0)
        window.location.href=`/cart/update/${productId}/${quantity}`
    })
  })
}
//hết cập nhật số lượng sản phẩm trong giỏ hàng

const CheckAll = document.querySelector("input[name='checkAll']")
const listCheckItem = document.querySelectorAll("input[name='checkItem']")
// console.log(CheckAll);
if (CheckAll) {
  CheckAll.addEventListener("click", () => {
    listCheckItem.forEach(item => {
      item.checked = CheckAll.checked
    })
  })
}


listCheckItem.forEach(item => {
  item.addEventListener("click", () => {
    const listCheckItemChecked = document.querySelectorAll("input[name='checkItem']:checked")
    CheckAll.checked = listCheckItemChecked.length == listCheckItem.length ? true : false
  })
})
// end checkAll

// show alert
const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
  const time = parseInt(showAlert.getAttribute('show-alert')) || 3000
  setTimeout(() => {
    showAlert.classList.add('hidden')
  }, time);
}
// end show alert