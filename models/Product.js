const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  sku: String,
  name: String,
  price: Number,
  categories: String,
  group_id: String,
  in_stock: Boolean,
  color: String,
  brand: String,
  data: Object,
},
{
  timestamps: true,
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
