const homeRoute = require('./home.route')
const productRoute = require('./product.route')
const categoryMiddeware=require('../../middewares/client/category.middewares');
const searchRoute=require('./search.route');
const cartMiddeware=require('../../middewares/client/cart.middewares');
const cartRoute=require('./cart.route');
const checkoutRoute=require('./checkout.route');
const userRoute=require('./user.route');
const userMiddewares=require('../../middewares/client/user.middewares');
module.exports= (app)=>{
  // su dung cho tat ca cac route
  // res.locals.categories duoc nhung o tat ca file pug
  app.use(categoryMiddeware,cartMiddeware )
  app.use(userMiddewares.userInfor)

  
  app.use('/',homeRoute)
  app.use('/products',productRoute)
  app.use('/search',searchRoute)
  app.use('/cart',cartRoute)
  app.use('/checkout',checkoutRoute)
  app.use('/user',userRoute)
}