const Product= require('../model/product.model');
module.exports = async (req,find) => {
  const productTotal = await Product
    .countDocuments(find)
  const pagination = {
    currPage: req.query.page ? parseInt(req.query.page) : 1,
    productLimit: 4
  }
  pagination.productSkip = (pagination.currPage - 1) * pagination.productLimit
  pagination.pageTotal = Math.ceil(productTotal / pagination.productLimit)
  return pagination
}
