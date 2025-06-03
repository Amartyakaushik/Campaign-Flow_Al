// models/CommunicationLog.js

const mongoose = require('mongoose');

const communicationLogSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  status: { type: String, enum: ['SENT', 'FAILED'], required: true },
  message: String,
  vendorResponse: String,
  deliveryTime: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('CommunicationLog', communicationLogSchema);