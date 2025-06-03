// controllers/campaignController.js

const Campaign = require('../models/Campaign');
const Customer = require('../models/Customer');
const CommunicationLog = require('../models/CommunicationLog');

/**
 * Utility: builds a MongoDB query object from a set of rules.
 * For now, expects a simple object like: { totalSpend: { $gt: 10000 } }
 */
const buildAudienceQuery = (rules) => {
  return rules; // In a real system you'd convert much more complex logic
};

// Create campaign + segment, log communication attempts
const createCampaign = async (req, res) => {
  try {
    const { name, segmentRules, message } = req.body;

    // 1. Find matching audience
    const query = buildAudienceQuery(segmentRules);
    const customers = await Customer.find(query);

    // 2. Create the campaign record
    const campaign = await Campaign.create({
      name,
      segmentRules,
      audienceSize: customers.length,
      status: 'processing'
    });

    // 3. Simulate sending the message to each customer + log result
    let sent = 0, failed = 0;
    for (let customer of customers) {
      // Simulate 90% success
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      if (status === 'SENT') sent++; else failed++;
      await CommunicationLog.create({
        campaign: campaign._id,
        customer: customer._id,
        status,
        message: `Hi ${customer.name}, ${message}`,
        vendorResponse: status === 'SENT' ? 'Delivered' : 'Failed'
      });
    }

    // 4. Update campaign status & stats
    campaign.status = 'completed';
    campaign.sentCount = sent;
    campaign.failedCount = failed;
    await campaign.save();

    return res.status(201).json({
      message: 'Campaign launched',
      campaignId: campaign._id,
      audience: customers.length,
      sent,
      failed
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all campaigns (history)
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all logs for a campaign
const getLogsForCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const logs = await CommunicationLog.find({ campaign: campaignId }).populate('customer', 'name email phone');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getLogsForCampaign
};