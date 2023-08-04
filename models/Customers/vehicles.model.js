const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    vehicle_name: {
        type: String,
        required: true, 
    },
    vehicle_registration: { 
        type: String,
        required: true,
    },
    dms: {
        type: String,
        default: null,
    },
    ecu: {
        type: String,
        default: null,
    },
    iot: {
        type: String,
        default: null,
    },
    featureset: {
        type: Number,
        default: 1,
    },
    status: {
        type: String,
        default: true,
    },

    created_at: { type: String, required: true },
    updated_at: { type: String                 },
    
});

// Create the VehicleModel model
const VehicleModel = mongoose.model('Vehicle', vehicleSchema);

// Export the VehicleModel model
module.exports = VehicleModel;
