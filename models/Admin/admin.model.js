const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the Admin model
const adminSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String, 
    required: true,  
  },
  email: {
    type: String,
    required: true
    
  },
  password: {
    type: String, 
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  accessToken: {
  type: String, 
  default: null 
 },
  status: {
    type: String,
   // required: true,
  },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
});


// Create the Admin model
const Admin = mongoose.model('Admin', adminSchema);

// Export the Admin model
module.exports = Admin;

// Hashing Password
module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Comparison failed", error);
  }
};


