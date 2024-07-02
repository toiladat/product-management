const multer= require('multer');

module.exports.storage=multer.diskStorage({
  destination: function(req,file,callBack){
    // folder de luu anh
    callBack(null,"./public/uploads/")
  },
  // ten file anh se luu
  filename:function(req,file,callBack){
    callBack(null,`${Date.now()}${file.originalname}`)
  }
})
