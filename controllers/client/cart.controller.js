const Cart = require('../../model/cart.model');
//[POST] /cart/add/:id
module.exports.addPost = async (req, res) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId
  const quantity = parseInt(req.body.quantity)

  const cart = await Cart.findOne({
    _id: cartId
  })

  const productCurrent = cart.products.find(item => item.productId == productId)
  if (productCurrent) {
    await Cart.updateOne({
      // tìm giỏ hàng
      _id: cartId,
      // tìm sản phẩm trong giỏ hàng
      'products.productId': productId
    }, {
      // update values in array of objects
      $set: {
        // cú pháp tên key mà values của nó là array.$. tên key của 1 object trong array 
        'products.$.quantity': quantity + productCurrent.quantity
      }
    })
  } else {
    await Cart.updateOne({
      _id: cartId
    }, {
      // push 1 sản phẩm vào giỏ hiện tại
      $push: {
        products: {
          productId: productId,
          quantity: quantity
        }
      }
    })
  }



  res.send("ok")
}