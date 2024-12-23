const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(3001, () => {
  console.log('Server is running on https://testing-jwt-react.onrender.com');
});
