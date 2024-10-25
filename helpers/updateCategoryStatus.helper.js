const productCategory = require("./../model/product-category.model");
const mongoose = require("mongoose");

const updateCategoryStatusHelper = async (id, statusChange, session) => {
  // Tìm danh mục con
  const childCategories = await productCategory
    .find({
      deleted: false,
      parent_id: id
    })
    .select("status originalStatus")
    .session(session); // Gán session vào truy vấn

  if (childCategories.length > 0) {

    for (const child of childCategories) {


      if (statusChange === "inactive") {
        // Cập nhật tất cả danh mục con thành inactive
        await productCategory.updateOne({
            _id: child._id
          }, {
            $set: {
              originalStatus: child.status || 'active',
              status: "inactive"
            }
          }, {
            session
          } // Gán session vào truy vấn
        );
      } else {
        // Khôi phục trạng thái từ originalStatus
        await productCategory.updateOne({
            _id: child.id
          }, {
            $set: {
              status: child.originalStatus || 'active',
              originalStatus: ""
            }
          }, {
            session
          } // Gán session vào truy vấn
        );
      }
      await updateCategoryStatusHelper(child._id, statusChange, session); // Đệ quy với cùng session

    }
  
  }
};

module.exports = updateCategoryStatus = async (id, statusChange) => {
  const session = await mongoose.startSession(); // Khởi tạo session
  session.startTransaction(); // Bắt đầu transaction

  try {
    // Gọi hàm helper với session
    await updateCategoryStatusHelper(id, statusChange, session);

    // Commit transaction nếu tất cả các thao tác thành công
    await session.commitTransaction();
  } catch (error) {
    // Rollback transaction nếu có lỗi xảy ra
    await session.abortTransaction();
    console.error("Error updating category status:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi khác nếu cần
  } finally {
    // Kết thúc session
    session.endSession();
  }
};