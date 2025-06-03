const express = require('express');
const router = express.Router();
const { createCampaign, getAllCampaigns, getLogsForCampaign } = require('../controllers/campaignController');

router.post('/', createCampaign);          // Create campaign and process segment
router.get('/', getAllCampaigns);          // List all campaigns (history)
router.get('/:campaignId/logs', getLogsForCampaign); // Get logs for a specific campaign

module.exports = router;