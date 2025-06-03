const express = require('express');
const router = express.Router();
const { addCustomer, getAllCustomers } = require('../controllers/customerController');

router.post('/', addCustomer);
router.get('/', getAllCustomers);

module.exports = router;