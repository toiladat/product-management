const product = require("../../model/product.model")

//[GET]/search
module.exports.index= async (req,res)=>{
  let keyword=""
  const find={
    deleted:false,
    status:'active',
  }
  if(req.query.keyword){
    const regex = new RegExp(req.query.keyword, 'i')
    find.title=regex
    keyword=req.query.keyword
  }
  const products=await product.find(find)
  for (item of products) {
    item.newPrice = ((1 - item.discountPercentage / 100) * item.price).toFixed(0)
  }
  res.render('client/pages/search/index.pug',{
    pageTitle:'Tìm kiếm',
    keyword:keyword,
    products:products
  })
}