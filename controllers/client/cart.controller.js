const Cart = require('../../model/cart.model');
const product = require('../../model/product.model');
//[GET] /cart
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId
  const cart = await Cart.findOne({
    _id: cartId
  })

  if (cart.products.length > 0) {
    cart.totalPrice = 0
    for (let Product of cart.products) {
      const productInfor = await product.findOne({
          _id: Product.productId
        })
        .select('thumbnail title slugTitle price discountPercentage quantity')
      productInfor.newPrice = ((1 - productInfor.discountPercentage / 100) * productInfor.price).toFixed(0)
      Product.totalPrice = parseInt(productInfor.newPrice) * parseInt(Product.quantity)
      Product.productInfo = productInfor
      cart.totalPrice += Product.totalPrice
    }
  }


  res.render('client/pages/cart/index.pug', {
    pageTitle: "Giỏ hàng",
    cartDetail: cart
  })
}

//[POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  try {
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
      req.flash('success', "Cập nhật số lượng thành công")
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
      req.flash('success', "Đã thêm vào giỏ hàng")
    }
  } catch {
    req.flash('error', "Thêm sản phẩm thất bại")
  } finally {
    res.redirect("back")
  }
}

//[GET]/cart/delete/:productId
module.exports.delete = async (req, res) => {
  try {
    const cartId = req.cookies.cartId
    const productId = req.params.productId


    await Cart.updateOne({
      _id: cartId
    }, {
      $pull: {
        products: {
          productId: productId
        }
      }
    })
    res.redirect("back")
  } catch {
    req.flash("error", "Vui long thu lai")
    res.redirect("back")

  }
}
//[GET]/cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId
  const {
    productId,
    quantity
  } = req.params
  await Cart.updateOne({
    _id: cartId,
    'products.productId': productId
  }, {
    $set: {
      'products.$.quantity': parseInt(quantity)
    }
  })
  res.redirect('back')
}