//models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Response schema

// Main user schema with embedded responses and assessments
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  subscriptionType: {
    type: String,
    enum: ['free', 'paid'],
    default: 'free',
  }
});


// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
