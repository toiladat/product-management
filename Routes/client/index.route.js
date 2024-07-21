const homeRoute = require('./home.route')
const productRoute = require('./product.route')
const categoryMiddeware=require('../../middewares/client/category.middewares');
const searchRoute=require('./search.route');
module.exports= (app)=>{
  // su dung cho tat ca cac route
  // res.locals.categories duoc nhung o tat ca file pug
  app.use(categoryMiddeware)
  app.use('/',homeRoute)
  app.use('/products',productRoute)
  app.use('/search',searchRoute)
}