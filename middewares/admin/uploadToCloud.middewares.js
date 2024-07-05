const cloudinary = require('cloudinary').v2
//cau hinh tai khoan cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret:process.env.api_secret
})
const streamifier = require('streamifier');
module.exports.uploadSingle = (req, res, next) => {
  
  if (req.file) {
    let streamUpload = (buffer) => {
      //trả về giá trị cho result
      return new Promise((resolve, reject) => {
        // Sử dụng cloudinary.uploader.upload_stream, một hàm từ SDK của Cloudinary, để tạo một stream upload.
        //nhận một callback để xử lý kết quả và lỗi khi quá trình upload hoàn thành.
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            //tra ve kq 
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        // lưu ảnh lên cloud
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const uploadImageToCloud = async (buffer) => {
      const result = await streamUpload(buffer)
      // lay theo name o iput
      req.body[req.file.fieldname] = result.url;
      next()
   
    }
    uploadImageToCloud(req.file.buffer)
  }
  
  else 
   next()
 
}