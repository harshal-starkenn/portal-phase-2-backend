const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  userId:              {type: String,  unique: true, required: true  },
  first_name:          {type: String,                required: true  },
  last_name:           {type: String,                required: true  },
  email:               {type: String,                required: true  },
  password:            {type: String,                required: true, },
  confirmPassword:     {type: String,                required: true, },
  status:              {type: String,                default: true   },
  company_name:        {type: String,                required: true, },
  address:             {type: String,                required: true, },
  state:               {type: String,                required: true, },
  city:                {type: String,                required: true, },
  pincode:             {type: String,                required: true, },
  phone:               {type: String,                required: true, },
  active:              {type: String,                 default: true  },
  resetPasswordToken:  {type: String,                 default: null  },
  resetPasswordExpires:{type: Date,                   default: null  },
  accessToken:         {type: String,                 default: null  },
  created_at:          { type: String,                required: true },
  updated_at:          { type: String,                required: true },

});


// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;


module.exports.hashPassword = async (password, confirmPassword) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const concatenatedPassword = password + confirmPassword;
    return await bcrypt.hash(concatenatedPassword, salt);
  } catch (error) {
    throw new Error("Hashing failed", error);
  }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
   // const saltRounds = 12 ;
    const match = await bcrypt.hash(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Comparison failed", error);
    throw new Error("Failed to compare passwords");
  }
};

