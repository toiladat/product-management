const Product = require('../model/product.model');
const productCategory = require('../model/product-category.model');
const Account = require('../model/account.model');

module.exports = async (req, find, criteria = 'product') => {
  let elementTotal = 0
  switch (criteria) {
    case "product":
      elementTotal = await Product.countDocuments(find)
      break;
    case "category":
      elementTotal = await productCategory.countDocuments(find);
      break;
    case "account":
      elementTotal = await Account.countDocuments(find);
      break;
  }
  const pagination = {
    currPage: req.query.page ? parseInt(req.query.page) : 1,
    limitElement: 4
  }
  pagination.skipElement = (pagination.currPage - 1) * pagination.limitElement
  pagination.pageTotal = Math.ceil(elementTotal / pagination.limitElement)
  return pagination
}