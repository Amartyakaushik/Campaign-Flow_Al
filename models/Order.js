// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  items: [{ name: String, price: Number, quantity: Number }],
  orderDate: { type: Date, default: Date.now },
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Order', orderSchema);