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

// Fetch all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer', 'name email');
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addOrder, getAllOrders, getOrderById };