const AnalyticsThresholds = require("../../models/Admin/AT.model");

const express = require('express');
const bodyParser = require("body-parser");
app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//==============Analytics-Threshold-Score==============//
exports.AddScore1 = async (req, res) => {
try {

const{ brake, tailgating, rash_driving, sleep_alert, over_speed, green_zone } = req.body;
const{ minimum_distance, minimum_driver_rating } = req.body;
const{ ttc_difference_percentage } = req.body;
const{total_distance} = req.body;
const{duration} = req.body

if (!brake) {
    return res.status(400).json({ message: 'brake value is required'});
} else if (!tailgating) {
    return res.status(400).json({ message: 'tailgating value is required'});
} else if (!rash_driving) {
    return res.status(400).json({ message: 'rash driving value is required'});
} else if (!sleep_alert) {
    return res.status(400).json({ message: 'sleep alert value is required'});
} else if (!over_speed) {
    return res.status(400).json({ message: 'over speed value is required'});
} else if (!green_zone) {
    return res.status(400).json({ message: 'green zone value is required'});
} else if (!minimum_distance) {
    return res.status(400).json({ message: 'minimum_distance value is required'});
} else if (!minimum_driver_rating) {
    return res.status(400).json({ message: 'minimum driver rating value is required'});
} else if (!ttc_difference_percentage) {
    return res.status(400).json({ message: 'ttc diff percentage value is required'});
} else if (!total_distance) {
    return res.status(400).json({ message: 'total distance value is required'});
} else if (!duration) {
    return res.status(400).json({ message: 'duration value is required'});
}

const newScore = new AnalyticsThresholds({
    brake,
    tailgating,
    rash_driving,
    sleep_alert,
    over_speed,
    green_zone
});

const newIncentive = new AnalyticsThresholds({
    minimum_distance,
    minimum_driver_rating
});

const newAccident = new AnalyticsThresholds({
    ttc_difference_percentage
});

const newLB = new AnalyticsThresholds({
    total_distance
});

const newHalt = new AnalyticsThresholds({
    duration
});

const savedScore = await newScore.save();
const savedIncentive = await newIncentive.save();
const savedAccident = await newAccident.save();
const savedLB = await newLB.save();
const savedHalt = await newHalt.save();


console.log('AT Score Genrate Successfully!', savedScore,savedIncentive,savedAccident,savedLB,savedHalt);
res.status(200).json({ code: 200, message: 'AT Score Genrate Successfully',
AddScores: savedScore,
AddIncentives: savedIncentive,
AddAccidents: savedAccident,
AddLBs: savedLB,
AddHalts: savedHalt
});
}catch (error) {
          console.log(error);
          res.status(500).json({ code: 500, message: 'Failed to add Devices' });
        }
};

//const AnalyticsThresholds = require("../../models/AnalyticsThresholds");

//const ScoreAnalytics = require("../../models/ScoreAnalytics");

exports.AddAnalytics = async (req, res) => {
    try {
        const{title,customer_id} = req.body;
        const{ brake, tailgating, rash_driving, sleep_alert, over_speed, green_zone } = req.body;
        const{ minimum_distance, minimum_driver_rating } = req.body;
        const{ ttc_difference_percentage } = req.body;
        const{total_distance} = req.body;
        const{duration} = req.body;
  
      if (
        !title ||
        !customer_id ||
        !brake ||
        !tailgating ||
        !rash_driving ||
        !sleep_alert ||
        !over_speed ||
        !green_zone ||
        !minimum_distance ||
        !minimum_driver_rating ||
        !ttc_difference_percentage ||
        !total_distance ||
        !duration
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const new_AT = new AnalyticsThresholds({
        title:title,
        customer_id:customer_id,
        newScore:
        {
        brake,
        tailgating,
        rash_driving,
        sleep_alert,
        over_speed,
        green_zone,
        },
        newIncentive:{

        minimum_distance,
        minimum_driver_rating,
        },
        newAccident:{
        ttc_difference_percentage,
        },
        newLB:{
        total_distance,
        },
        newHalt:{
        duration,
        }
      });
  
 
  
      const [saved_AT] = await Promise.all([
        new_AT.save(),
        // newIncentive.save(),
        // newAccident.save(),
        // newLB.save(),
        // newHalt.save(),
      ]);
  
      console.log(
        "AT Score Generated Successfully!",
        saved_AT,
        // savedIncentive,
        // savedAccident,
        // savedLB,
        // savedHalt
      );
  
      const response = {
        code: 200,
        message: "AT Score Generated Successfully",
        saved_AT
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
  
      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          code: 400,
          message: "Validation error",
          errors: validationErrors,
        });
      }
  
      res.status(500).json({
        code: 500,
        message: "Failed to add scores",
      });
    }
  };
  
  
  



//==============Analytics-Thareshold-Incentive=============//
exports.AddIncentive = async (req, res) => {

};

//==============Analytics-Threshold-Accident==============//
exports.AddAccident = async (req, res) => {

};

//==============Analytics-Thareshold-Leadership-Board============//
exports.AddLB = async (req, res) => {

};

//==============Analytics-Threshold-Leadership-Board==============//
exports.AddHalt = async (req, res) => {
    
}



