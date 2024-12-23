const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

// Route to login
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// Route to access protected data
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data' });
});

module.exports = router;
