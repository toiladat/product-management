const Cart = require("../../model/cart.model");
const Order = require("../../model/order.model");
const Product = require("../../model/product.model");

// [GET] /checkout/
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  });

  cart.totalPrice = 0;

  if (cart.products.length > 0) {
    for (const product of cart.products) {
      const productInfo = await Product.findOne({
        _id: product.productId
      }).select("title thumbnail slug price discountPercentage");
      productInfo.priceNew = (1 - productInfo.discountPercentage / 100) * productInfo.price;
      product.productInfo = productInfo;
      product.totalPrice = productInfo.priceNew * product.quantity;
      cart.totalPrice += product.totalPrice;
    }
  }
  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart
  });
};
//[POST] /checkout/oder
module.exports.orderPost = async (req, res) => {
  const cartId = req.cookies.cartId
  const userInfor = req.body
  const orderData = {
    userInfor: userInfor,
    products: []
  }
  // thanh tooán toàn bộ giỏ hàng
  // note.txt 
  const cart = await Cart.findOne({
    _id: cartId
  })
  for (const product of cart.products) {

    const productInfor = await Product.findOne({
        _id: product.productId
      })
      .select('price discountPercentage')

    orderData.products.push({
      productId: product.productId,
      price: productInfor.price,
      discountPercentage: productInfor.discountPercentage,
      quantity: product.quantity
    })

  }
  const newOrder = new Order(orderData)
  // sau khi luu tu render ra order._id
  await newOrder.save()


  // xoa thong tin trong gio hang
  // xoa san pham dung for de pull id hoac tim hieu pullAll
  await Cart.updateOne({
    _id: cartId
  }, {
    products: []
  })
  // khong dung res.render 
  res.redirect(`/checkout/success/${newOrder._id}`)
}

// [GET]/checkout/success/:orderId
module.exports.success = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
      _id: orderId
    })
    order.totalPrice = 0
    for (const product of order.products) {
      const productInfor = await Product.findOne({
        _id: product.productId
      })
      product.thumbnail = productInfor.thumbnail
      product.title = productInfor.title

      product.newPrice = ((1 - product.discountPercentage / 100) * product.price).toFixed(0)
      product.totalPrice = product.newPrice * product.quantity
      order.totalPrice += product.totalPrice
    }

    res.render('client/pages/checkout/success.pug', {
      pageTitle: "Đặt hàng thành công",
      order: order
    })
  } catch {
    req.flash('error', 'Đặt hàng thất bại')
    res.redirect('back')
  }
}