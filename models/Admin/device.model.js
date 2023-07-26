const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  device_id: { type: String, required: true },
  device_type: { type: String, required: true },
  customer_id: { type: String, required: true },
  sim_number: { type: Number, required: true },
  //status:{type: String, required: true },
  status: { type: String, default: true },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
});

// Create the User model
const Devices = mongoose.model("Devices", deviceSchema);

// Export the User model
module.exports = Devices;
