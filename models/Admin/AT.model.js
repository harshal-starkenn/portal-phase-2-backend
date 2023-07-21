const mongoose = require("mongoose");

const AT_Schema = new mongoose.Schema({

title:       {type: String,  required: true},
customer_id: {type: String,  required: true},
    newScore:{
brake:        {type: Number,  required: true},
tailgating:   {type: Number,  required: true},
rash_driving: {type: Number,  required: true},
sleep_alert:  {type: Number,  required: true},
over_speed:   {type: Number,  required: true},
green_zone:   {type: Number,  required: true},
    },
    newIncentive:{
minimum_distance:        {type: Number,  required: true},
minimum_driver_rating:   {type: Number,  required: true},
    },
    newAccident:{
ttc_difference_percentage:   {type: Number,  required: true},
    },
    newLB:{
total_distance:   {type: Number,  required: true},
    },
    newHalt:{
duration:   {type: Number,  required: true},

    },
    status:              {type: String,                default: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
}) 

const AnalyticsThresholds = mongoose.model('AnalyticsThreshold_Admin', AT_Schema);

module.exports = AnalyticsThresholds;

