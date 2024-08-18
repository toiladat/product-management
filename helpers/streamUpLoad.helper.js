const cloudinary = require('cloudinary').v2
//cau hinh tai khoan cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
})
const streamifier = require('streamifier');

module.exports = (buffer) => {
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