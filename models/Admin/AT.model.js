const mongoose = require("mongoose");

const AT_Schema = new mongoose.Schema({
    title:       {type: String,  required: true},
    //isFloat({ min: 0, max: 100 })
    customer_id: {type: String,  required: true},
        newScore:{
    brake:        {type: Number,  required: true,min: 0, max: 1000 },
    tailgating:   {type: Number,  required: true,min: 0, max: 1000 },
    rash_driving: {type: Number,  required: true,min: 0, max: 1000 },
    sleep_alert:  {type: Number,  required: true,min: 0, max: 1000 },
    over_speed:   {type: Number,  required: true,min: 0, max: 1000 },
    green_zone:   {type: Number,  required: true,min: 0, max: 1000 },
        },
        newIncentive:{
    minimum_distance:        {type: Number,  required: true,min: 0, max: 1000 },
    minimum_driver_rating:   {type: Number,  required: true,min: 0, max: 5 },
        },
        newAccident:{
    ttc_difference_percentage:   {type: Number,  required: true,min: 0, max: 100 },
        },
        newLB:{
    total_distance:   {type: Number,  required: true,min: 0, max: 1000 },
        },
        newHalt:{
    duration:   {type: Number,  required: true,min: 0, max: 1000 },
    
        },
        status:              {type: String,                default: true },
        created_at: { type: String, required: true },
        updated_at: { type: String, required: true },
    }) ;
    
    const AnalyticsThresholds = mongoose.model('AnalyticsThreshold_Admin', AT_Schema);
    
    module.exports = AnalyticsThresholds;
    

