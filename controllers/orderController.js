// controllers/orderController.js

const Order = require('../models/Order');

// Add a new order
const addOrder = async (req, res) => {
  try {
    const { customer, amount, items, orderDate } = req.body;
    const order = new Order({
      customer, amount, items, orderDate
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addOrder };