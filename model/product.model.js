const mongoose = require('mongoose')
//tao ra truong du lieu unique nhu tieu de...
//slug de ceo web no thay the cho id, khi bot gg tim kiem thi slug co y nghia nen de duoc ceo hon
const slug=require('mongoose-slug-updater');
mongoose.plugin(slug)
// destructuring
const {Schema}= mongoose
// tao ra schema bang new va dua vao cac truong du lieu duoc them hoac sua tu ben fe
const productSchema = new Schema(
  {
    title:String,
    productCategoryId:String,
    description:String,
    discountPercentage:Number,
    stock:Number,
    thumbnail:String,
    position:Number,
    price:Number,
    status:String,
    createdBy:String,
    notable:String,
    updatedBy:String,
    deletedBy:String,
    deleted:{
      type:Boolean,
      default:false
    },
    slugTitle:{
      // kieu du lieu tren url la string
      type:String,
      //tao theo title
      slug:"title",
      // moi slug la duy nhat
      unique:true
    }
  },
  {
    //them createdAt va updatedAt vao record 
    // gia tri se thay doi khi them va cap nhat
    timestamps:true
  }

)
// tao ra 1 model (tham so tu dinh nghia, schema, location trong mongoDB)
const product = mongoose.model('product',productSchema,'products')
module.exports = product