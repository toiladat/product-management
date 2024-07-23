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