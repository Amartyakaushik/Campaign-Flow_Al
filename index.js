// index.js

const express = require('express');
const cors = require('cors');                // Handles security for frontend-backend connections
const connectDB = require('./config/db');    // Import DB connection function
require('dotenv').config();                  // Import .env secrets/config variables

const app = express();

connectDB();  // Call our DB connection, so MongoDB connects!

// Middlewares — these let your server read JSON and allow cross-origin requests:
app.use(express.json()); // Lets API read JSON bodies in the request
app.use(cors());         // Allows connection from your frontend (React)

// Import routes
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.get('/', (req, res) => {
  res.send('API is running!');
});
// Campaigns route
app.use('/api/campaigns', require('./routes/campaignRoutes'));


const PORT = process.env.PORT || 5000;             // Use port from .env, or 5000 as default
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));