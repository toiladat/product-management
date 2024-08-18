const streamUpload=require('../../helpers/streamUpLoad.helper');
module.exports.uploadSingle = (req, res, next) => {

  if (req.file) {

    const uploadImageToCloud = async (buffer) => {
      const result = await streamUpload(buffer)
      // lay theo name o iput
      req.body[req.file.fieldname] = result.url;
      // Để đảm bảo rằng next() chỉ được gọi sau khi quá trình tải lên Cloudinary hoàn tất, bạn cần đợi hàm uploadImageToCloud hoàn tất trước khi gọi next().
      next()
    }
    uploadImageToCloud(req.file.buffer)
  } else
    // 1 middeware khong the co 2 next() chong len nhau 
    next()

}

// xoa file tren cloud 
// Change 'sample' to any public ID of your choice req.file.public_
// cloudinary.uploader.destroy('sample', function (result) {
//   console.log(result)
// });