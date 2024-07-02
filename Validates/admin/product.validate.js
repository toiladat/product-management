module.exports.createPost=(req,res,next)=>{
  if(!req.body.title){
    req.flash("error","Vui long nhap ten SP")
    res.redirect(`/${config.prefixAdmin}/products/create`)
    return;
  }
  // muon chay sang controller tiep thi phai co next()
  next()
}