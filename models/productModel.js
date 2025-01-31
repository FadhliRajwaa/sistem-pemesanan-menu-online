const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
