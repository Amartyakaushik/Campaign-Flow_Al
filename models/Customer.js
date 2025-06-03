// models/Customer.js

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  totalSpend: { type: Number, default: 0 },
  visits: { type: Number, default: 1 },
  lastActive: { type: Date, default: Date.now },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Customer', customerSchema);