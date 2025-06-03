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

// Fetch all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { addCustomer, getAllCustomers, getCustomerById };