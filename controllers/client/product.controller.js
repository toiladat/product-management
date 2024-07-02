const products = require('../../model/product.model')

module.exports.index = async (req, res) => {

  // tim mac dinh status = active
  const find = {
    status: 'active',
    deleted: false
  }
  const paginationHelper = require('../../helpers/pagination.helper');
  const pagination = await paginationHelper(req, find)

  const Products = await products
    .find(find)
    .limit(pagination.productLimit)
    .skip(pagination.productSkip)
    .sort({
      position: 'desc'
    })




  res.render("client/pages/products/index.pug", {
    pageTitle: "Sản phẩm",
    Products: Products,
    pagination: pagination
  })
}
module.exports.create = (req, res) => {

  res.render("client/pages/products/create", {
    pageTitle: "Sản phẩm"
  })
}
module.exports.edit = (req, res) => {

  res.render("client/pages/products/edit", {
    pageTitle: "Sản phẩm"
  })
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;

  const product = await products.findOne({
    slugTitle: slug,
    deleted: false,
    status: "active"
  });

  if (product) {
    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product
    });
  } else {
    res.redirect("/");
  }
}