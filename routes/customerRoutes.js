const express = require('express');
const router = express.Router();
const { addCustomer, getAllCustomers, getCustomerById } = require('../controllers/customerController');

router.post('/', addCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById); // fetch one customer by ID

module.exports = router;