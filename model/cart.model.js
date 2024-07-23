const mongoose=require('mongoose');
const slug=require('mongoose-slug-updater');
mongoose.plugin(slug)
const Schema = new mongoose.Schema({
  products: [{
    productId: String,
    quantity: Number
  }]
}, {
  timestamps: true
})

const Cart = mongoose.model("Cart", Schema, 'carts')
module.exports = Cart