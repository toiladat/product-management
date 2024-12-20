const productCategory = require('../../model/product-category.model');
const products = require('../../model/product.model')
//[GET]/
module.exports.index = async (req, res) => {
  // tim mac dinh status = active

  const allSubCategoies = []

  const getSubCategories = async (currentId) => {
    const subCategories = await productCategory.find({
      parent_id: currentId,
      deleted: false,
      status: 'active'
    })
    for (item of subCategories) {
      allSubCategoies.push(item.id)
      await getSubCategories(item.id)
    }
  }
  // lay tat ca sp
// phai co await
  await getSubCategories('')

  const find = {
    status: 'active',
    deleted: false,
    productCategoryId: {
      $in: [
        ...allSubCategoies
      ]
    }
  }
  const paginationHelper = require('../../helpers/pagination.helper');
  const pagination = await paginationHelper(req, find)

  const Products = await products
    .find(find)
    .limit(pagination.limitElement)
    .skip(pagination.skipElement)
    .sort({
      position: 'desc'
    })

  for (item of Products) {
    item.newPrice = ((1 - item.discountPercentage / 100) * item.price).toFixed(0)
  }


  res.render("client/pages/products/index.pug", {
    pageTitle: "Sản phẩm",
    Products: Products,
    pagination: pagination
  })
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  const product = await products.findOne({
    slugTitle: slug,
    deleted: false,
    status: "active"
  });
  product.newPrice=((1-product.discountPercentage/100)*product.price).toFixed(0)
  if (product) {
    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product
    });
  } else {
    res.redirect("/");
  }
}

//[GET]/product/:slugCategory
module.exports.category = async (req, res) => {
  const slug = req.params.slugCategory;
  const category = await productCategory.findOne({
    slugTitle: slug,
    status: 'active',
    deleted: false
  })

  const allSubCategoies = []

  const getSubCategories = async (currentId) => {
    const subCategories = await productCategory.find({
      parent_id: currentId,
      deleted: false,
      status: 'active'
    })
    for (item of subCategories) {
      allSubCategoies.push(item.id)
      await getSubCategories(item.id)
    }
  }
// phai co await
  await getSubCategories(category._id)

  const find = {
    status: 'active',
    deleted: false,
    productCategoryId: {
      $in: [
        category._id,
        ...allSubCategoies
      ]
    }
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

  for (item of Products) {
    item.newPrice = ((1 - item.discountPercentage / 100) * item.price).toFixed(0)
  }


  res.render("client/pages/products/index.pug", {
    pageTitle: category.title,
    Products: Products,
    pagination: pagination
  })
}