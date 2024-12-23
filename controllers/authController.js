const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust this path to where your User model is located

const secretKey = 'yourSecretKey'; // Replace with your own secret key

// Signup functionality
exports.signup = async (req, res) => {
  const { email, password, name } = req.body;

  // Validate the input fields
  if (!email || !password || !name) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // Check if the email format is valid (basic regex for validation)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'Invalid email format' });
  }

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).send({ message: 'Email already in use' });
  }

  // Hash the password before saving the user
  const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds for better security

  // Create and save the new user
  const user = new User({
    email,
    password: hashedPassword,
    name,
  });

  try {
    await user.save();
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.status(201).send({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Login functionality
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  // Compare the password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

  res.status(200).send({
    message: 'Login successful',
    token,
  });
};
