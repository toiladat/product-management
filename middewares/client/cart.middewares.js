const Cart = require("../../model/cart.model")

module.exports=async(req,res,next)=>{
  if(!req.cookies.cartId){
    
    const cart = new Cart()
    await cart.save();
// luu vao cookies ben fe 
    const expriesCookies= 360*24*60*60*1000
    res.cookie('cartId',cart.id,
    {
      expires: new Date(Date.now()+expriesCookies)
    })
  }
  else{
    const cart= await Cart.findOne({_id:req.cookies.cartId})
    res.locals.totalProducts=cart.products.length || 0
  }
  

  next()
}