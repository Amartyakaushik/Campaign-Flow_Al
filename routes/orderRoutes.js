const express = require('express');
const router = express.Router();
const { addOrder, getAllOrders, getOrderById } = require('../controllers/orderController');

router.post('/', addOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById); // fetch one order by ID

module.exports = router;