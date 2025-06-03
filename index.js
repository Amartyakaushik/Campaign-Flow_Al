// // index.js
// const session = require('express-session');
// const passport = require('passport');
// const express = require('express');
// const cors = require('cors');                // Handles security for frontend-backend connections
// const connectDB = require('./config/db');    // Import DB connection function
// require('dotenv').config();                  // Import .env secrets/config variables

// require('./auth/google'); // Import Google auth config
// const app = express();

// connectDB();  // Call our DB connection, so MongoDB connects!

// // Middlewares — these let your server read JSON and allow cross-origin requests:
// app.use(express.json()); // Lets API read JSON bodies in the request
// app.use(cors());         // Allows connection from your frontend (React)

// // Import routes
// app.use('/api/customers', require('./routes/customerRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.get('/', (req, res) => {
//   res.send('API is running!');
// });
// // Campaigns route
// app.use('/api/campaigns', require('./routes/campaignRoutes'));
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// const PORT = process.env.PORT || 5000;             // Use port from .env, or 5000 as default
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// index.js

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();
require('./auth/google'); // Ensure you have Google auth config

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Import and use routes
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

// // Define other necessary routes and middleware...
// app.get('/', (req, res) => {
//   res.send('API is running!');
// });
app.get('/', (req, res) => {
    res.json({ message: 'Authentication successful', user: req.user });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});