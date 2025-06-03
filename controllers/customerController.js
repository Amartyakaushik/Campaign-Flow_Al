// controllers/customerController.js

const Customer = require('../models/Customer');

// Add a new customer
const addCustomer = async (req, res) => {
  try {
    // req.body contains the customer info sent by client
    const { name, email, phone, totalSpend, visits, lastActive } = req.body;
    const customer = new Customer({
      name, email, phone, totalSpend, visits, lastActive
    });
    await customer.save();
    res.status(201).json(customer); // Send back the new customer as JSON
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate email
      res.status(409).json({ message: 'Email already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = { addCustomer };