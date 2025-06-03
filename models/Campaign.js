// models/Campaign.js

const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  segmentRules: { type: Object, required: true }, // store rule definitions as JSON
  audienceSize: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' },
  sentCount: { type: Number, default: 0 },
  failedCount: { type: Number, default: 0 },
}, {
  timestamps: true // adds createdAt, updatedAt
});

module.exports = mongoose.model('Campaign', campaignSchema);