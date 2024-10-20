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
    .populate({
      path: 'productCategoryId', // Liên kết với ProductCategory thông qua productCategoryId
      match: {
        status: 'active'
      } // Điều kiện: chỉ populate các category có status là 'active'
    }).select('-description');

  // Lọc ra những sản phẩm có Category không null (nằm trong Category có status là 'active')
  const notableProductsFinal = notableProducts.filter(product => product.productCategoryId != null);
  for (item of notableProductsFinal) {
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
    .populate({
      path: 'productCategoryId', // Liên kết với ProductCategory thông qua productCategoryId
      match: {
        status: 'active'
      } // Điều kiện: chỉ populate các category có status là 'active'
    }).select('-description');
  const newestProductsFinal = newestProducts.filter(product => product.productCategoryId !== null);
  for (item of newestProductsFinal) {
    item.newPrice = ((1 - item.discountPercentage / 100) * item.price).toFixed(0)
  }
  // inactive category ông nội thì products của cháu phải k được lấy ra
  //em đang có giải pháp là cứ truy vấn ngược lên danh mục gốc (danh mục có parent_id là rỗng ) nếu nó có tồn tại 1 danh mục nào đó là inactive thì nó cho cờ là false
  //nhưng mà như thế thì mỗi sản phẩm nó đều phải truy ngược lên thì hơi mất công
  res.render("client/pages/home/index", {
    pageTitle: "trang chủ",
    notableProducts: notableProductsFinal,
    newestProducts: newestProductsFinal
  })
}