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
    // cart null hoặc products undefined thì = 0
    res.locals.totalProducts = (cart?.products?.length ?? 0);
  }
  

  next()
}