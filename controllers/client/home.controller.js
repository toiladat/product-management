const product = require("../../model/product.model")

module.exports.index = async (req, res) => {
  const notableProducts = await product.find({
      deleted: false,
      status: "active",
      notable: '1'
    })
    .sort({
      position: 'desc'
    })
    .limit(3)
    .select('-description')
  for (item of notableProducts) {
    item.newPrice = ((1 - item.discountPercentage / 100) * item.price).toFixed(0)
  }


  const newestProducts = await product.find({
    deleted: false,
    status: "active",
  })
  .sort({
    position: 'desc'
  })
  .limit(6)
  .select('-description')
for (item of newestProducts) {
  item.newPrice = ((1 - item.discountPercentage / 100) * item.price).toFixed(0)
}

  res.render("client/pages/home/index", {
    pageTitle: "trang chủ",
    notableProducts: notableProducts,
    newestProducts:newestProducts
  })
}