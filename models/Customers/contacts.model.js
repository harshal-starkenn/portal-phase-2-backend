const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
   
    name:{type: String,  required: true },
    email:{type: String,  required: true },
    contact_number:{type: Number,  required: true },
    gender:{type: String,  required: true },
    status:{type: String,    default: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
    //status:{type: String, required: true },
});


// Create the User model
const Contacts = mongoose.model('Contacts', contactSchema);

// Export the User model
module.exports = Contacts;