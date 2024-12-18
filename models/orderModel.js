const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  requestPesanan: { type: String },
  payment_method: { type: String, required: true },
  delivery_address: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
