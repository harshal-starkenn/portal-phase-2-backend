const mongoose = require('mongoose');


const RFIDSchema = new mongoose.Schema({
   
    rfid:          {type: String},
    driver_name:   {type: String,  required: true },
    age:           {type: Number,  required: true },
    contact_number:{type: Number,  required: true },
    gender:        {type: String,  required: true },
    status:        {type: String,   default: true },
    created_at:    { type: String, required: true },
    updated_at:    { type: String, required: true },
});

// Create the User model
const Driver_RFID = mongoose.model('RFID', RFIDSchema);

// Export the User model
module.exports = Driver_RFID;