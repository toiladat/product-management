const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)

const {
  Schema
} = mongoose

const productCategorySchema = new Schema({
  title: String,
  parent_id: {
    type: String,
    default: ""
  },
  thumbnail: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  position: Number,
  description: String,
  slugTitle: {
    type: String,
    slug: 'title',
    unique: true
  }
}, {
  timestamps: true
})

const productCategory = mongoose.model('productCategory', productCategorySchema, 'product-category')
module.exports = productCategory