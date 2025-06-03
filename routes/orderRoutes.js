const express = require('express');
const router = express.Router();
const { addOrder, getAllOrders } = require('../controllers/orderController');

router.post('/', addOrder);
router.get('/', getAllOrders);

module.exports = router;